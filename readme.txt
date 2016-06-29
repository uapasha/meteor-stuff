https://pizza-app-uapasha-c9.c9users.io/

0.0.0.0   pizza-app-uapasha-c9.c9users.io

I was getting the redirect error for my python / tornado app running on ubuntu. Using localhost didn't work as the accepted answer highlighted. Google wants a public domain.

My solution was to piggyback "example.com" which is public and create a sub domain in my /etc/hosts file. The sub domain would work on my local dev box and google would be happy with the example.com domain. I registering the redirects via the google console and the redirect worked successfully for me.

I added the following to my /etc/hosts:

192.168.33.100   devbox  devbox.example.com
In my case the IP was that of my machine. I could also have used 127.0.0.1 instead.

My Google API console (https://code.google.com/apis/console) set up for a new client ID was:

"Application Type: Web Application".
Via "Your site or hostname (more options)":
In "Authorized Redirect URIs" I entered http://devbox.example.com/
In "Authorized JavaScript Origins" I entered http://devbox.example.com/
shareimprove this answer
answered Aug 17 '12 at 10:58

Oisin
785612
5	 	
Use a domain different than localhost (local.mydomain.com) and use hosts file to map the fake domain to 127.0.0.1 works like a charm. Thanks mate. – Phương Nguyễn Sep 24 '12 at 7:31
1	 	
To get this to work with pow, create a symlink called default to the app your working with from ~/.pow. This will make 0.0.0.0 or 127.0.0.1 go to the default app. – Jasper Kennis Nov 21 '12 at 12:51
  	 	
Tried this, but couldn't get it to work. Hopefully others have better luck than me. – Ash Blue Dec 18 '12 at 0:21
3	 	
This solution + xip.io works for me on both emulators and real phones. example.com does not work because either emulators or phones cannot access example.com faked by host machine's /etc/hosts. xip.io provides a global faked domain. SO it works. – Joe C Feb 1 '14 at 20:11
  	 	
I got this to work for the AdWords on Rails demo app. The only difference was I had to modify the "Authorized Redirect URI" in the "Client ID for web application" settings so it exactly matched the redirect_uri in the request details of the error message. – d3vin Mar 26 '14 at 7:00