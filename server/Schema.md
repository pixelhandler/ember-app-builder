# Schema Notes

* See: [json-schema-04]

[json-schema]: http://json-schema.org
[json-schema-core]: http://json-schema.org/latest/json-schema-core.html
[links]: http://json-schema.org/latest/json-schema-hypermedia.html
[json-schema-04]: http://tools.ietf.org/html/draft-zyp-json-schema-04

TODO review links

## Blog Post JSON

	{
	    "post": {
	        "author": {
	            "name": "d2h"
	        },
	        "body": "A long list of topics were raised and I took a time to ramble at large about all of them at once. ",
	        "id": "33482542-2cba-4875-a666-c7a307b77193",
	        "title": "The Parley Letter"
	    }
	}

## Generator

* See [jsonschema.net]

[jsonschema.net]: http://www.jsonschema.net/index.html

## Schema

	{
		"type":"object",
		"$schema": "http://json-schema.org/draft-03/schema",
		"id": "http://jsonschema.net",
		"required":false,
		"properties":{
			"post": {
				"type":"object",
				"id": "http://jsonschema.net/post",
				"required":false,
				"properties":{
					"author": {
						"type":"object",
						"id": "http://jsonschema.net/post/author",
						"required":false,
						"properties":{
							"name": {
								"type":"string",
								"id": "http://jsonschema.net/post/author/name",
								"required":false
							}
						}
					},
					"body": {
						"type":"string",
						"id": "http://jsonschema.net/post/body",
						"required":false
					},
					"id": {
						"type":"string",
						"id": "http://jsonschema.net/post/id",
						"required":false
					},
					"title": {
						"type":"string",
						"id": "http://jsonschema.net/post/title",
						"required":false
					}
				}
			}
		}
	}
