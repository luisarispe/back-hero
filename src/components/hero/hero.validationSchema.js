const validationSchema = {
    type: "object",
    properties: {
        "id_hero": {"type": "string"},
        "color": {
            "type": "string",
            "enum" : ["azul","violeta","naranjo","verde",]
        },
        "color_code": {
            "type": "string",
            "enum" : ["#1f8ff7","#a43de3","#df5c0f","#0ea521"]
        }
    },
    required: ["id_hero","color","color_code"],
  };
  
  module.exports = validationSchema;
  