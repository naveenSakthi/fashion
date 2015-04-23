package com.fashion.schema;

import com.gofrugal.raymedi.common.util.DatabaseConfigGen;
import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;

import java.io.IOException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class DbConfigGenerator {

    private static final Logger LOGGER=Logger.getLogger("DbConfigGenerator.class");
    private static final String APP_NAME = "servquick";
    private static final String DB_CONFIG_FILE = "db_config.ini";
    private static final String PROP_SESSION_STORE="sessionStore";
    private static final String PROP_REDIS_HOST="redisServer";
    private static final String PROP_REDIS_PORT="redisPort";
    private static final String REDIS_SESSION_STORE="redis";
    private static final String APP_CONTEXT_PATH ="../../tomcat/conf/Catalina/localhost/";


    public void  dbconfigProcess(final String basedir) throws Exception {

        final DatabaseConfigGen g = new DatabaseConfigGen();
        g.loadConfigFile(basedir + File.separator + DB_CONFIG_FILE);

        final String[] configIdList = new String[0];
        File f = new File(basedir + File.separator + "../package/tomcat/conf/Catalina/localhost/servquick.xml.template");
        if (!f.exists()) {
            f = new File(basedir + File.separator + "../../tomcat/conf/Catalina/localhost/servquick.xml.template");
        }
        String appName = g.getProperty("app.webappname");
        if (appName == null) {
            appName = APP_NAME;
        }

        final File f2 = new File(basedir + File.separator + APP_CONTEXT_PATH + appName + ".xml");
        if (f2.exists()) {
            f2.delete();
        }

        final Vector vec = new Vector();
        g.addVecProperty(vec, "##app.webappname##", appName);


        // Session store configuration
        final String redisServer = g.getProperty(PROP_REDIS_HOST);
        final String redisPort = g.getProperty(PROP_REDIS_PORT);
        final String sessionStore = g.getProperty(PROP_SESSION_STORE);
        if (REDIS_SESSION_STORE.equalsIgnoreCase(sessionStore) && !StringUtils.isEmpty(redisServer) && !StringUtils.isEmpty(redisPort)) {
            g.addVecProperty(vec, "<!-- Redis Session store - start", " ");
            g.addVecProperty(vec, "##redis.server##", redisServer);
            g.addVecProperty(vec, "##redis.port##", redisPort);
            g.addVecProperty(vec, "Redis session store - end -->", " ");
        }


        g.dbConfigConversion(f.getPath(), basedir + File.separator + APP_CONTEXT_PATH + appName + ".xml", vec, configIdList);

        File source = new File(basedir + File.separator + "quartz.properties");
        File dest = new File(basedir + File.separator + "../web/WEB-INF/classes/quartz.properties");
        if (source.exists()) {
            File destPath = new File(dest.getAbsolutePath().substring(0, dest.getAbsolutePath().lastIndexOf(File.separator)));
            if (!destPath.exists()) {
                destPath.mkdir();
            }
            copyFileUsingFileStreams(source, dest);
        }
    }


    /**
     * @param args the command line arguments
     */
    public static void main(final String[] args) {

        String basedir;
        if (args.length == 0) {
            basedir = ".";
        } else {
            basedir = args[0];
        }

        try {
            final DbConfigGenerator dcg = new DbConfigGenerator();
            dcg.dbconfigProcess(basedir);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "Error :: ", ex);
            System.exit(1);
        }
        System.exit(0);
    }

    public static void copyFileUsingFileStreams(File source, File dest) throws IOException {
        InputStream input = null;
        OutputStream output = null;
        try {
            input = new FileInputStream(source);
            output = new FileOutputStream(dest);
            byte[] buf = new byte[1024];
            int bytesRead;
            while ((bytesRead = input.read(buf)) > 0) {
                output.write(buf, 0, bytesRead);
            }
        } finally {
            input.close();
            output.close();
        }
    }
}
