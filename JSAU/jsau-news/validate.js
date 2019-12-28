'use strict';
let categories= [
	"nouveau",
	"datanouv",
	"real",
	"eco",
	"techh"
		]
module.export = {
	categories,
	validate : function(cat){
		return categories.includes(cat)		
	}
}
