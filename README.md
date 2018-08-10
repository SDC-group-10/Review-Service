# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### API

####Crud Methods: 

#####Create
  Create review: curl -X POST -h 'Content-Type: application/json' -d '{"first_name":, "listing_id":, "user_id": , "accuracy":, "communication": , "cleanliness":, "location":, "check_in":, "value":, "date":, "content":}'
  
#####Read 
  Get Review:
    curl -X GET 'http://localhost:3002/reviews_service/listing/reviews/:listingid''

#####Update
  Update review:
    curl -X PUT 'http://localhost:3002/reviews_service/listing/update/:id/:review'

#####Delete
  Delete review:
    curl -X DELETE 'http://localhost:3002/reviews_service/listing/delete/:id/:review
