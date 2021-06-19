package com.iti.measurement;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/DML")
public class MeasurementAPI {

	@POST
	@Path("/post")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response insertMeasurement(Measurement measurement) {
		String result =null;
		
		int state = measurement.insertMeasurement(measurement);
		
		if(state == 1) {
	      result = "Measurement is Inserted";
		}
			
		else if(state == 0)	{
			 result = "Measurement is not Inserted";
		}
		return Response.status(200).entity(result).build();
		
              		
	}
}
