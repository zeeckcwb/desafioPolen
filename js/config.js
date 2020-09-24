$(function(){
	var operacao = "A"; // "A" = Adição  |  "E" = Edição
	var indice_selecionado = -1;
	var tbOngs = localStorage.getItem("tbOngs"); // Recupera os dados armazenados no localStorage
	tbOngs = JSON.parse(tbOngs); // Converte string para objeto JSON

	if(tbOngs == null) // Caso não haja conteúdo, inicia-se um vetor vazio
		tbOngs = [];

	function Adicionar(){
		var ong = GetOng("nome", $("#labelName").val());
		if(ong != null){
			alert("Ong já cadastrada.");
			return;
		} // Caso a Ong já esteja cadastrada, um alerta será exibido

		var lnk = GetOng("link", $("#labelLink").val());
		if(lnk != null){
			alert("Link já cadastrado.");
			return;
		} // Caso o link já esteja cadastrada, um alerta será exibido

		var tbOng = JSON.stringify({
            nome: $("#labelName").val(),
            slogan: $("#labelSlogan").val(),
            link: $("#labelLink").val()
        });
		tbOngs.push(tbOng);
		localStorage.setItem("tbOngs", JSON.stringify(tbOngs));
		alert("Registro adicionado.");
		return true;
	} // Função para adicionar novas Ongs

	function Editar(){
		tbOngs[indice_selecionado] = JSON.stringify({
            nome: $("#labelName").val(),
            slogan: $("#labelSlogan").val(),
            link: $("#labelLink").val()
        }); //Altera o item selecionado na tabela
		localStorage.setItem("tbOngs", JSON.stringify(tbOngs));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	} // Função para editar Ongs

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
                "<tr class='tblHeader'>"+
                    "<th>Nome</th>"+
                    "<th>Slogan</th>"+
                    "<th>Link Site</th>"+
                    "<th class='tblCenter'>Ativo</th>"+
                    "<th class='tblEnd'>Configuração</th>"+
                "</tr>"+
            "</thead>"+
			"<tbody>"+
			"</tbody>"
			); // Listar o cabeçalho da tabela

		 for(var i in tbOngs){
			var ong = JSON.parse(tbOngs[i]);
			$("#tblListar tbody").append(
				"<tr class='checkSelected'>"+ 
		   		"<td>"+ong.nome+"</td>"+ 
		   		"<td>"+ong.slogan+"</td>"+ 
		   		"<td>"+ong.link+"</td>"+
				"<td class='checkbox'>"+"<input class='checkCenter' type='checkbox'></td>"+
				"<td>"+"<div class='tblButtons'><a alt='"+i+"' class='btnEditar' data-toggle='modal' data-target='#modal-register'>Editar</a><input type='submit' value='Excluir' class='btnExcluir'/></div></td>"+
			 	"</tr>");
		 } // Listar a tabela com as Ongs cadastradas
	} // Função para listar a tabela no HTML

	function Excluir(){
		tbOngs.splice(indice_selecionado, 1);
		localStorage.setItem("tbOngs", JSON.stringify(tbOngs));
		alert("Registro excluído.");
	} // Função para excluir uma Ong

	function GetOng(propriedade, valor){
		var ong = null;
        for (var item in tbOngs) {
            var i = JSON.parse(tbOngs[item]);
            if (i[propriedade] == valor)
				ong = i;
        }
        return ong;
	} // Função para listar cada Ong do objeto

	Listar();

	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	}); // Chamada da função no evento de onSubmit do form

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var ong = JSON.parse(tbOngs[indice_selecionado]);
		$("#labelName").val(ong.nome);
		$("#labelSlogan").val(ong.slogan);
		$("#labelLink").val(ong.link);
	}); // Chamada da função no evento de onClick do botão editar

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	}); // Chamada da função no evento de onClick do botão excluir

	$('input').on('click', function() {
		$('input[type="checkbox"]').parents('.checkSelected').css('background', 'none');
		$('input[type="checkbox"]:checked').parents('.checkSelected').css('background', '#95D4B1');
	}); // Alterando a cor do background clicando no checkbox

});