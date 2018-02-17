var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema,
	graphql,
  	GraphQLSchema,
  	GraphQLObjectType,
  	GraphQLString
   } = require('graphql');
var fetch = require('node-fetch');


var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
    	id:{
    		type: GraphQLString,
    		args: {
        		lang: { type: GraphQLString }
        	}
    		},
      hello: {
        type: GraphQLString
      },foo: {
        type: GraphQLString
      },
    }
  })
});
var app = express();
app.use(function (req, res, next) {

  console.log('Time:', Date.now())

  

  next()
})

app.get('/',(req,res)=>{
	console.log('get', Date.now())
	fetch('https://jsonplaceholder.typicode.com/posts')
	  .then(response => response.json())
	  .then(json => res.send(json));
})




app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: { hello:'Hello world!',foo:"bar",id:'5' },
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));