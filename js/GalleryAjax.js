function ShowMore() {
	//отправляю POST запрос и получаю ответ
	$.ajax({
		type:'post',//тип запроса: get,post либо head
		url:'form_processing.php',//url адрес файла обработчика
		data: 'Show=true',
		response:'text',//тип возвращаемого ответа text либо xml
		errrep:true,//отображение ошибок error если true
		error:function(num) {//ошибки запроса
			var arr=['Your browser does not support Ajax',
						'Request failed',
						'Address does not exist',
						'The waiting time left'];
			alert(arr[num]);
		},
		success:function (data) {//возвращаемый результат от сервера
			$("#gallery").html(data);
		}
	});
}