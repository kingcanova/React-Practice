const {ObjectID} = require('mongodb').ObjectID;
  
  const resolvers = {
    Query: {
      items: async (root, data, { mongo: { list } }) => {
        const response = await list.find({}).toArray()
        return response.map(function transform(data) {
          return Object.assign({ id: data['_id'].toString() }, data);
        }); ;
      }
    },
    Mutation: {
      createTask: async (root, data, { mongo: { list } }) => {
        data['checked'] = 0;
        // insert data in async fashion. Await waits for async call to complete
        const response = await list.insert(data); 
        // get the inserted id from the mongodb response and assign to the `id` key in data
        return Object.assign({ id: response.insertedIds[0] }, data); 
      },
      updateTask: async (root, data, { mongo: { list } }) => {
        console.log(data.id);
        console.log(data.isDone);
        // insert data in async fashion. Await waits for async call to complete
        const response = await list.findOneAndUpdate({_id: new ObjectID(data.id)}, 
                                                      { $set: { isDone: data.isDone, updatedAt: timeStamp } }, 
                                                      { returnOriginal: false}); 
        if (response.value){
          // get the updated document id from the mongodb response and assign to the `id` key in data
          return Object.assign({ id: response.value._id }, response.value);;
        }
        throw("Not a valid input");
      },
    },    
  };

  module.exports = resolvers;