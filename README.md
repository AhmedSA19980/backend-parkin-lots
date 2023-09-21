# back-end-parking-lots
# display table: npx prisma studio

# notes:
1-prisma does not work with yarn, when try to generate :it represent (Error: Could not resolve prisma and @prisma/client in the current project. Please install them with [object Promise] and
 [object Promise], and rerun yarn dlx prisma generate 🙏
 .
 )

2-prisma date:
When you use this string as input in Prisma, it is converted to UTC time by subtracting the time zone offset of 2 hours. This results in the UTC time of "2023-06-19T11:32:00Z", which is equivalent to the original time of "2023-06-19T13:32:00+02:00".

3- pay attention to time zone of different countries == diverse time zone


 # done
 [] auth system 
 -[x] fix book route create table even response send 400 
 -[x] query book properties plus, user properties . exclude pass property:
 prisma provide method (select) to query properties based on developer 
 -[x] fix query all users shows password field even after selecting property:
https://blog.logrocket.com/password-hashing-node-js-bcrypt/
[] validate exiting user.email 

[] check if user is deleted ,user can't  create booking  ,
using nexauth on backend can make issued:
 -Configuration errors:
 -Configuration errors:
 -Session management issues:
 -Database errors:
 -Provider-specific issues:
 -Version compatibility issues:


#pattern
-  route separation or modular routing. 




#if you push with wronh branch type ->git reset HEAD~1

what the difference between cron job & setinterval?
he main difference between a cron job and setInterval is the environment in which they run. A cron job runs on the server as part of the operating system, while setInterval runs in a JavaScript runtime environment, such as a web browser or Node.js. This means that you can use a cron job to schedule tasks that need to run on the server, while setInterval is more suitable for tasks that need to run in a JavaScript environment.

Another difference is the level of precision and reliability. Cron jobs are designed to run at precise times and are managed by the operating system, so they are generally more reliable and accurate than setInterval, which can be affected by factors such as CPU load and other processes running in the JavaScript runtime environment

Why do we need'em ? 

-booking time complete capacity should update (increament by one) 

RESOURCES
how to debug TS as backend service ?
https://www.youtube.com/watch?v=cjTZT5S3MrY&t=194s&ab_channel=BrandonDonnelson

how to install mocha and intergate with chai and sinon:
https://www.testim.io/blog/mocha-for-typescript-testing/


