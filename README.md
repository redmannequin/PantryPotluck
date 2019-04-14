# Pantry-Potluck

Pantry Potluck is a web application providing a unique recipe search engine. A user can choose from the various tags (ingredients, dietary restrictions) and the service will output a list of recipes that use the ingredients specified and that conform to the other various properties. This tool was designed around the fact that there are a lot of meals that you can make with ingredients lying around your house. Pantry Potluck provides the means of finding these recipes. Using this will maximize the potential of your ingredients and minimize the amount of waste because of the unused ingredients around your home.

## Running
1. Install and run neo4j on your system
2. Inside both the client and server directory run `npm i && npm run build`
3. Inside the server directory create a `.env` file with the following variables dependent on your system
   - `NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`
4. Inside server run `npm run dev`
5. Visit [localhost:5000/populate](http://localhost:5000/populate) to parse and add everything to the database
6. Visit [localhost:3000](http://localhost:3000) to access the front-end
