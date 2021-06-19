package com.iti.verification;

import java.beans.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.xml.bind.annotation.XmlRootElement;
import com.iti.measurement.DataBase;

@XmlRootElement

public class Verification {

	String msisdn;
	String verifCode;
	int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMsisdn() {
		return msisdn;
	}

	public void setMsisdn(String msisdn) {
		this.msisdn = msisdn;
	}

	public String getVerifCode() {
		return verifCode;
	}

	public void setVerifCode(String verifCode) {
		this.verifCode = verifCode;
	}

	public int insertMeasurement(Verification ver) {
		DataBase db = new DataBase();
		int result = -1;
		db.connect();

		try {
			result = db.DML("Insert into  verification (msisdn,verifCode) VALUES ('" + ver.getMsisdn() + "','"
					+ ver.getVerifCode() + "');");

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		db.disconnect();
		return result;
	}

	int checkCode(Verification ver) {
		DataBase db = new DataBase();
		int y=-1; 
		db.connect();  
		   try {
			ResultSet rs = db.select("select count(id) from verification where msisdn='" + ver.getMsisdn()
					+ "' and verifcode='" + ver.getVerifCode() + "';");
			if (rs.next()) {
                y = rs.getInt(1);
                System.out.print(y);
            }
		   
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		   db.disconnect();
		   System.out.print(y);
		   return y;
	   }
	
}
