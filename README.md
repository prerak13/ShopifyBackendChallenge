
# Shopify Backend Developer Intern 

This repository contains solution to the Shopify 2022 Backend Developer Intern Challenge.
## Objective

Build an inventory tracking web application for a logistics company.[Documentation](https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit)
 (Focoused on the backend of application as evaluation dosent depends on the front code.)

## Features

- Create Inventory Items
- View Inventory Items
- Update Items
- Softdelete Items
- Recover Items



## Demo

- Replit (https://replit.com/@prerak131/ShopifyBackendChallenge)


## Deployment

To deploy this project:
- Clone it from the [github](https://github.com/prerak13/ShopifyBackendChallenge)
- run "npm i"
- run "npm run dev" (This shall run nodeJS on 5001 port and reactJS on 3000 port.)





## API Reference



|type|URI| Parameter | Type     | Description                |
|:---|:-| :-------- | :------- | :------------------------- |
|GET| /items|- | - | Returns all active items |
|GET| /items/deleted|- | - | Returns all deleated items |
|GET| /items/:itemID| itemID | String | Returns item with specific item id |
|POST| /items/| Item object|JSON body| Creates new item|
|PUT| /items/:itemID| itemID, updated Item in body| String, JSON body| Updates item with id=itemID|
|DELETE| /items/:itemID| itemID, deletionComment| String, JSON body| Soft deletes item with itemID provided. Adds deletion comment to the deleted item.|
|PUT| /items/restore/:itemID| itemID| String| Restores item with id equals to itemID|

