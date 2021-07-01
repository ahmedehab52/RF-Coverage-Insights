package com.iti.verification;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


@Path("/")
public class VerificationAPI {
	public static final String ACCOUNT_SID = "ACbd83194a52f681de3c6b46d57df3bca3";
	public static final String AUTH_TOKEN = "a4fabeac4721c1f3461e48ad520bd434";

	@POST
	@Path("/sendCode")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response  sendVerificationCode(Verification ver) {
		ver.setVerifCode(VerificationAPI.generateRandom(5));
        String result=null ;
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
		Message message = Message.creator(
				new com.twilio.type.PhoneNumber(ver.getMsisdn()),
				new com.twilio.type.PhoneNumber("+19283797343"),
				"Your verification code Is :" + ver.verifCode).create();
		if(message.getSid().equals(null))
      		result = "Failed to send Message:";
		else {
			 result   = "Message Sent Successfuly:";
			 ver.insertVerif(ver);
		}		
		return Response.status(200).entity(result).build();
	}

	
	@POST
	@Path("/isCodeValid")
	@Consumes(MediaType.APPLICATION_JSON)
     public Response isValid(Verification ver) {
    	 String result = "{\"verified\": \"false\"}";
    	 String state = ver.checkCode(ver);
    	 if(state.equals("1"))
    		 result = "{\"verified\": \"true\"}";
    	 
    	 return Response.status(200).entity(result).type(MediaType.APPLICATION_JSON).build(); 
     }
     
     
     
     
     
     
     
	static String generateRandom(int n) {

		// chose a Character random from this String
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

		// create StringBuffer size of AlphaNumericString
		StringBuilder sb = new StringBuilder(n);

		for (int i = 0; i < n; i++) {

			// generate a random number between
			// 0 to AlphaNumericString variable length
			int index = (int) (AlphaNumericString.length() * Math.random());

			// add Character one by one in end of sb
			sb.append(AlphaNumericString.charAt(index));
		}

		return sb.toString();
	}
}
