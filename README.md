# project-gemini
Project Gemini - Student Registration System

_Student Registration System (SRS)_

#####Public Portal Features: 
* Register a new father or tutor account using email as username
* Parents or tutor will activate the account using the email sent
* Search Student Info by Last SSN, Date of birth and SIS Student Number
* Review student data from SIS 
* Request Pre-enrollment student data for the new incoming school year
* Ask if the student will keep in the previous enrolled school
* Show the pre-enrollment form prefilled if data exists
* If the data doesn't exists, request the region, grade level and school (Show physical address of the school to avoid confussion with names)
* Request Parent contact info, we have the email already, only request telephones (residentials and mobile)
* Last Final Review form to submit the pre-enrollment
* Once the Pre-enrollment is submitted a email will be received for the parents. Also a status form will always show of the pre-enrollment submitted
* Always present the option to pre-enroll another student


#####Admin Portal New Features:
* Users for this portal will be only school directors and central SIE level clerks. Data will be pull directly from SIS
* Roles should be the followings:
	* SIE_ADMIN
	* REGION
	* DISTRICT
	* MUNICIPALITY
	* SCHOOL
* Load the submitted requests depending the user's role
* User should evaluate the request approve and denied with comments
* Dashboard show present the data given user's hierarchy access level
* Profile form should not be editable
* Config form will be only for SIE_ADMIN users to manage date limits on pre-enrollment submit data and among other stuff

#####Important Links

[Hibernate used in this project](http://docs.jboss.org/hibernate/orm/5.0/userguide/html_single/Hibernate_User_Guide.html)

[Example](http://www.baeldung.com/registration-with-spring-mvc-and-spring-security)
