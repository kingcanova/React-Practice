import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
  } from 'graphql/type';
  
  import listItem from './models/list';
  
  /**
   * generate projection object for mongoose
   * @param  {Object} fieldASTs
   * @return {Project}
   */
  export function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
      projections[selection.name.value] = true;
      return projections;
    }, {});
  }
  
  var todoType = new GraphQLObjectType({
    name: 'item',
    description: 'todo item',
    fields: () => ({
      item: {
        type: GraphQLString,
        description: 'The name of the todo.',
      },
      checked: {
        type: GraphQLInt,
        description: 'Completed todo? '
      }
    })
  });
  
  var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        list: {
          type: new GraphQLList(todoType),
          args: {
            item: {
              name: 'item',
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: (root, {item}, source, fieldASTs) => {
            var projections = getProjection(fieldASTs);
            var foundItems = new Promise((resolve, reject) => {
                listItem.find({item}, projections,(err, list) => {
                    err ? reject(err) : resolve(list)
                })
            })
            //console.log(listItem.find({item}));
            return foundItems
          }
        }
      }
    })
    
  });
  
  export default schema;