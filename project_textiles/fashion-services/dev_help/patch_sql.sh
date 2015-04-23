print_help(){
echo "Usage: sh patch_sql.sh baseversion"
echo "Usage: sh patch_sql.sh DEFAULT_VALUE"
echo "Usage: sh patch_sql.sh DEFAULT_VALUE MYSQL FALSE"
echo "Usage: sh patch_sql.sh VIEW  MYSQL FALSE"
echo "Usage: sh patch_sql.sh baseversion MYSQL FALSE {sim} {trial} "
}

if [ $# -eq 0 ]
then
print_help
exit 1
fi

BASE_VER=$1
DBASE=$2
AUTO_BACKUP=$3

if [ "$AUTO_BACKUP" = "" ]
then
AUTO_BACKUP="FALSE"
fi

if [ "$DBASE" = "" ]
then
DBASE="MYSQL"
fi

. ./setenv.sh
##. ./../dbConfig.sh

mkdir -p log

OUTLOG=log/out_log.txt
ERRLOG=log/err_log.txt
XLOG=log/log.txt
PLOG=log/patchdb_out.txt


clear_log(){
  rm -f $OUTLOG
  rm -f $ERRLOG
  rm -f $XLOG
  rm -f $PLOG
}

createschema(){
if [ -f  ../../build/build.xml -a "$SIM" = "FALSE" ]
then
  ant -f ../../build/build.xml createschema
  if [ $? -ne  0 ]
  then 
    echo "Problem in createschema ....."
    exit 1
  fi
fi
}

SIM="FALSE"
RUN_CREATE_SCHEMA="FALSE"

if [ "$BASE_VER" = "HELP" -o "$BASE_VER" = "help" -o "$BASE_VER" = "-help" -o "$BASE_VER" = "--help" ]
then
       print_help
       exit 0
elif [ "$BASE_VER" = "VIEW" ]
then
	EXTRA_ARG="-type view"
elif [ "$BASE_VER" = "DEFAULT_VALUE" ]
then
	EXTRA_ARG="-type default_value"
elif [ "$BASE_VER" = "TRG" ]
then
	EXTRA_ARG="-type trigger"
elif [ "$BASE_VER" = "-nocreateschema" ]
then
     RUN_CREATE_SCHEMA="FALSE"
     EXTRA_ARG="$3 $4 $5 $6 $7 $8 $9"
elif [ "$BASE_VER" = "2400" ]
then
     EXTRA_ARG="$3 $4 $5 $6 $7 $8 $9"
else
     RUN_CREATE_SCHEMA="FALSE"
     EXTRA_ARG="$1 $2 $3 $4 $5 $6 $7 $8 $9"
fi

clear_log



if [ "$RUN_CREATE_SCHEMA" = "TRUE" ]
then
createschema
fi

if [ "$DBASE" = "MYSQL" ]
then
if [ "$AUTO_BACKUP" = "TRUE" ]
then
  echo Taking the mysql backup
  mkdir -p ../../db_backup
  mysqldump -u root -P $DATABASE_PORT --protocol=tcp raymedi_hq > ../../db_backup/mysql_bkp.zip
fi
elif [ "$DBASE" = "ORACLE" ]
then
  echo "Assumed you have taken the required backup"
else
  print_help
  exit 1
fi




java $SYSP com.gofrugal.common.patch.util.PatchManager -command moveOldLog


#java $SYSP $CS_CONN_NANE com.gofrugal.raymedi.common.util.PatchDB patch.properties -config patch_config_webpos.xml -debugfilename patchdbwebpos_debug.txt $EXTRA_ARG >log/patchdbwebpos_out.txt 2>&1
java $SYSP $CS_CONN_NANE com.gofrugal.raymedi.common.util.PatchDB patch.properties -incremental -config patch_config.xml -debugfilename patchdb_debug.txt $EXTRA_ARG >log/patchdb_out.txt 2>&1
echo ServQuick Patch Completed


#cat $OUTLOG
echo "Check the log files in log  directory"

