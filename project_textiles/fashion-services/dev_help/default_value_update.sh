. ./setenv.sh

#@rem argument help prints all the list
#@rem argument namevalue executes the particular defaultclass.

java $SYSP $CS_CONN_NANE $MT_WRAPPER com.gofrugal.raymedi.common.util.DefaultValueUpdate ./default_value_config.xml $*

