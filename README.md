# MY_RECIPE_DB
(not in production)

### Never forget a recipe again!


Ever felt like you keep looking up the same recipe again and again? Ever made changes to recipes and forgotten them? No longer.  
My_recipe_DB is a place you can safely store all of your recipes and retrieve them with a few finger taps.  Easily add more recipes
to your collection when ever you feel like and they will be right there when you get back.  No more lost notes, no more hassle....
just cooking. 

### On the inside

![Alt text](/client/public/readme_pic.png)

### Tech stack / Technologies
Build using the MERN stack and cloudinary to host images.

### How to use
As the application is not in production you will have to create your own cloudinary account and put your Cloduinary API_Key, 
API_Secret and Cloudinary name in your .env file on the server side.  Assign them to the correct variables so they match the variable names that you will find 
in backendUtils/cloudinary.js.  You wil also have to create your own DB on MongoAtlas.  After creating a db be sure to add your mongoURI to your default.json file 
in the config file.  You should also place your JWT secret in this default.json file as well in order for the authentication to work.

### Licence 
MIT © Antony Parker
