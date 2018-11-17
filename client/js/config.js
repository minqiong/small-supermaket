
require.config({
	paths:{
		jquery:'../libs/jquery/jquery-3.2.1',
		bootstrap:'../libs/bootstrap-3.3.7-dist/js/bootstrap',
		Datagrid:'datagrid',
		// Datagrid:'datagrid',
		qrcode:'../libs/qrcode',
		Jcarousel:'../lib/Jcarousel/Jcarousel',
		Common:'common',
		xzoom:'../lib/xzoom/xzoom',
		Putaway:'putaway',
		Datagrid:'datagrid',
		Goods:'goods',
		Login:'login',
		Users:'users',
		Producer:'producer',
		Returns:'returns',
		Purchase:'purchase',
		Receive:'receive',
		Inventory:'inventory',
		Cashier:'cashier',
		// Qrcode: '../libs/qrcode'
	},
	shim:{
		bootstrap:['jquery'],
		qrcode:['jquery'],
		Jcarousel:['jquery'],
		Common:['jquery'],
		Putaway:['jquery'],
		Datagrid:['jquery','bootstrap'],
		Datagird:['jquery','bottstrap'],
		Goods:['jquery','bootstrap'],
		Login:['jquery'],
		Users:['jquery'],
		Producer:['jquery','bootstrap'],
		Returns:['jquery'],
		Purchase:['jquery'],
		Receive:['jquery'],
		Inventory:['jquery'],
		Cashier:['jquery'],
		// Qrcode: ['jquery']
	}
})