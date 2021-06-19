package com.iti.measurement;

import java.sql.SQLException;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement

public class Measurement {

	int id;
	long cell_id;
	long lac;
	String cell_type;
	int bandwidth;
	int mcc;
	int mnc;
	String country;
	String operator;
	int signal_strength_level;
	int imei;
	int imsi;
	Double latitude;
	Double longitude;
	
	public Double  getLatitude() {
		return latitude;
	}
	public void setLatitude(Double  latitude) {
		this.latitude = latitude;
	}
	public Double  getLongitude() {
		return longitude;
	}
	public void setLongitude(Double  longitude) {
		this.longitude = longitude;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getCell_id() {
		return cell_id;
	}
	public void setCell_id(long cell_id) {
		this.cell_id = cell_id;
	}
	public long getLac() {
		return lac;
	}
	public void setLac(long lac) {
		this.lac = lac;
	}
	public String getCell_type() {
		return cell_type;
	}
	public void setCell_type(String cell_type) {
		this.cell_type = cell_type;
	}
	public int getBandwidth() {
		return bandwidth;
	}
	public void setBandwidth(int bandwidth) {
		this.bandwidth = bandwidth;
	}
	public int getMcc() {
		return mcc;
	}
	public void setMcc(int mcc) {
		this.mcc = mcc;
	}
	public int getMnc() {
		return mnc;
	}
	public void setMnc(int mnc) {
		this.mnc = mnc;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public int getSignal_strength_level() {
		return signal_strength_level;
	}
	public void setSignal_strength_level(int signal_strength_level) {
		this.signal_strength_level = signal_strength_level;
	}
	public int getImei() {
		return imei;
	}
	public void setImei(int imei) {
		this.imei = imei;
	}
	public int getImsi() {
		return imsi;
	}
	public void setImsi(int imsi) {
		this.imsi = imsi;
	}
	
	public int insertMeasurement(Measurement measurement) {
		DataBase db = new DataBase();
		int result = -1;
		db.connect();
		  
		   try {
			result = db.DML("Insert into  measurements (cell_id,lac,cell_type,bandwidth,"
					+ "mcc,mnc,country,operator,signal_strength_level,imei,imsi,latitude,longitude)"
					+ " values("+measurement.getCell_id()+","+measurement.getLac()+",'"+
					measurement.getCell_type()+"',"+measurement.getBandwidth()+","+
					measurement.getMcc()+","+measurement.getMnc()+",'"+measurement.getCountry()+
					"','"+measurement.getOperator()+
					"',"+measurement.getSignal_strength_level()+","+measurement.getImei()+
					","+measurement.getImsi()+","+measurement.getLatitude()+","+
					measurement.getLongitude()+");");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		   db.disconnect();
		   return result;
	}



}
