package com.fashion.dao;

import javax.naming.Context;
import javax.sql.DataSource;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by Naveen on 19-04-2015.
 */
public class InitDatabaseServlet extends HttpServlet {
   private static final Logger LOGGER = Logger.getLogger("InitDatabaseServlet.class");

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        String ContextPath = this.getServletContext().getContextPath();
        String servletPath = this.getServletContext().getRealPath("/");

        LOGGER.log(Level.INFO, "contextPath  :   "    + ContextPath);
        LOGGER.log(Level.INFO, "servletPath  :   "    + servletPath);

        try{
            Class.forName("com.mysql.jdbc.Driver");

            InitialContext initialContext = new InitialContext();

            Context envContext  = (Context)initialContext.lookup("java:/comp/env");
            DataSource dataSource = (DataSource)envContext.lookup("jdbc/mydb");

            Connection connection = dataSource.getConnection();

            LOGGER.log(Level.INFO, "Connection    : "    + connection);

            LOGGER.log(Level.INFO, "Connection datasource   : "  + dataSource);

        } catch (NamingException ne){
            LOGGER.log(Level.INFO, "NO context is initalized", ne);

        } catch (SQLException se){
            LOGGER.log(Level.SEVERE, "SQLException    : " ,se);
        } catch (ClassNotFoundException cnfe){
            LOGGER.log(Level.SEVERE, "ClassNotFoundException    : " ,cnfe);
        }

    }
}
