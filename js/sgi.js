$($.date_input.initialize);
$(function() {
  // CALENDARIO
  $(".date_picker").date_input();

	// MÁSCARAS
	jQuery(function($){
		$(".inp_fone").mask("(99) 9999.9999?9");
		$(".date").mask("99/99/9999");
		$(".date_picker").mask("99/99/9999");
		$(".date_full").mask("99/99/9999 99:99");
		$(".hour").mask("99:99:99");
		$(".hour_min").mask("99:99");
		$(".inp_cpf").mask("999.999.999-99");
		$(".inp_cnpj").mask("99.999.999/9999-99");
		$(".inp_cep").mask("99.999-999");

		$('.inp_fone').focusout(function(){
			var phone, element;
			element = $(this);
			element.unmask();
			phone = element.val().replace(/\D/g, '');

			if(phone.length > 10) {
				element.mask("(99) 99999-999?9");
			} else {
				element.mask("(99) 9999-9999?9");
			}
		}).trigger('focusout');
	});
});

function geraObj(){
	var id_reg = $('.id_reg').val();
	var pasta_sub = $('.table_sub').val();
	var pasta_son = $('.table_son').val();

	var pasta = $('.table_name').val()+(pasta_sub!='' && pasta_sub!=undefined ? '/'+pasta_sub : '')+(id_reg>0 ? '/'+id_reg : '')+(pasta_son!='' && pasta_son!=undefined ? '/'+pasta_son : '');

	var obj = {};
	obj['id_reg'] = id_reg;
	obj['pasta'] = pasta;
	obj[$('input.csrf_name').val()] = $('input.csrf_hash').val();

	return obj;
};

// EDICAO DE CAMPOS NA LISTA
function editarData(){
	$(".editarData").date_input().change(function(){
		var obj = geraObj();
		var seletor = $(this);
		obj['id'] = seletor.closest('tr').attr('id').substr(5);
		obj['id_cfg_campo'] = seletor.attr('rel');
		obj['valor_campo'] = seletor.val();
		
		$('#trID-'+obj.id+' td[rel='+obj.id_cfg_campo+']').load(obj.pasta+'/salvar_campo/', obj, function(data){});
	});
};
function editarDataFull(){
	$(".editarDataFull").mask("99/99/9999 99:99");

	$('.editarDataFull').keydown(function (e){
		if(e.keyCode == 13){
			var obj = geraObj();
			var seletor = $(this);
			obj['id'] = seletor.closest('tr').attr('id').substr(5);
			obj['id_cfg_campo'] = seletor.attr('rel');
			obj['valor_campo'] = seletor.val();
			
			$('#trID-'+obj.id+' td[rel='+obj.id_cfg_campo+']').load(obj.pasta+'/salvar_campo/', obj, function(data){});
		}
	});
};


// INICIALIZA VARIAVEIS PARA UPLOAD
var fazer_upload = [];

var upload_f = [];
upload_f['enviado'] = 0;
upload_f['concluido'] = 0;

function uploadPadrao(){
	var obj = geraObj();

	// Retira a classe file (adicionada por plugin) de alguns inputs
	setTimeout(function(){
		$('.formPadrao input[type=file]').removeClass('file');
	}, 300);

	$.each($('.formPadrao input[type=file]'), function(index, value) { 
		var id_arquivo = $(this).attr('name');

		fazer_upload[id_arquivo] = new AjaxUpload(id_arquivo, {
			action: obj.pasta+'/upload/'+id_arquivo+'/',
			autoSubmit: false,
			name: id_arquivo,
			onChange : function(file){
				var sel = $('input[name='+id_arquivo+']').parent('div').siblings('input');
				if(sel.val()!=''){
					upload_f['enviado']++;
				}
				sel.val(file);
			},
			onSubmit : function(id, fileName){},
			onComplete : function(file, response){
				var data = jQuery.parseJSON(response);

				if(data.rs=='erro' && data.msg!=undefined){
					flashMessageStatic('erro', data.msg);
				}

				// exibe miniatura
				if(data.rs=='ok'){
					var html_img = '';
					var subdomain = UPLOAD_REMOTE_ENABLED=='1' && UPLOAD_REMOTE_URL!='' ? UPLOAD_REMOTE_URL+'/' : '';

					html_img += '<img class="imgPreviewImg" src="'+subdomain+'img/c/100/100/'+data.tabela+'/'+data.arquivo+'" alt="">';
					html_img += '<div>';
					//html_img += '	<input type="file" id="'+data.coluna+'" name="'+data.coluna+'" class="">';
					html_img += '	<a href="'+data.url_arquivo+'" rel="shadowbox">View</a>';
					html_img += '	<a href="javascript:void(0);" class="delete_img" data-id="'+data.id+'" data-coluna="'+data.coluna+'">Delete</a>';
					html_img += '	<span class="name_img" style="display:inline-block; margin-left:5px; line-height:32px;"></span>';
					html_img += '</div>';

					// escreve html da imagem
					$('.imgPreview.ulImg_'+data.coluna+'_'+data.id).html(html_img);

					// reinicia shadowbox para ampliacao
					Shadowbox.init({ skipSetup: true });
					Shadowbox.setup();

					upload_f['concluido']++;
				}

				$('.formPadrao').submit();
			}
		});
	});

	$('.imgPreview .send_img').click(function(){
		$(this).closest('div').find('input[type=file]').trigger('click');
	});

	if($('.formPadraoImagem #upload-multiplo').css('display')){
		var totalMUp = 0;
		var totalMTerminado = 0;
		var qtdUploadInvalido = 0;
		var tamanho_maximo = parseFloat(UPLOAD_MODEL_MAX_FILESIZE_UPLOAD);
		if(tamanho_maximo==0){
			tamanho_maximo = 5;
		}

		var uploader = new qq.FileUploader({
			// Sobrescreve template padrão para não exibir textos
			template: '<div class="qq-uploader">' + 
				'<div class="qq-upload-button">Clique no botão escolher</div>' +
				'<div class="qq-upload-drop-area"><span>ou arraste as imagens para esta área</span></div>' +
				'<ul class="qq-upload-list"></ul>' + 
				'</div>',

			element: $('#upload-multiplo')[0],
			action: obj.pasta+'/uploadm/arquivo/',
			allowedExtensions: ['gif', 'jpg', 'jpeg', 'png'],
			sizeLimit: 1048576*tamanho_maximo,// em bytes
			debug: false,
			maxConnections: 1,
			params: obj,
			onSubmit: function(id, fileName){
				totalMUp++;
			},
			onProgress:function(id, nome, carregado, total){
				var porcentagem = (carregado*100) / total;
				$('.qq-upload-progress-bar:eq('+id+')').css('width',porcentagem+'%');
			},
			onComplete:function(id, fileName, responseJSON){
				var cor_bg = responseJSON.rs=='ok' ? '#028c12' : '#db0d0d';
				$('.qq-upload-progress-bar:eq('+id+')').css('background-color', cor_bg);
				$('.qq-upload-progress-bar:eq('+id+')').closest('.qq-upload-fail').css('color', cor_bg);
				$('.qq-upload-failed-text:eq('+id+')').text(responseJSON.rs);
				//console.log(responseJSON);

				if(responseJSON.rs!=undefined)
				{
					if(responseJSON.rs=='erro'){
						qtdUploadInvalido++;
						flashMessageStatic('erro', responseJSON.msg);
					}

					var url_retorno = $('.urlRetornoMUp').val();
				}
				else
				{
					var response=jQuery.parseJSON(responseJSON);
					if(response === false || response==null)
					{
						// the response was a string "false", parseJSON will convert it to boolean false
					}

					qtdUploadInvalido++;
				}

				totalMTerminado++;

				// se nenhum upload deu problema, redireciona para a listagem
				if(totalMUp==totalMTerminado && qtdUploadInvalido==0 && url_retorno!=undefined && url_retorno!=''){
					window.location = url_retorno;
				}

				// se terminou todos, reseta erro
				if(totalMUp==totalMTerminado){
					qtdUploadInvalido = 0;
				}
			},
			onCancel:function(id, fileName){
				$('.qq-upload-progress-bar:eq('+id+')').css('background-color','red');
			},
			showMessage: function(message){
				flashMessageStatic('erro', message);
			}
		});

		$('.disparaUp').click(function(){
			$('#upload-multiplo input[type=file]').trigger('click');
		});
	}

	if($('#formPPerfil input[type=file]').css('display')){
		var id_arquivo = 'arquivo';

		fazer_upload[id_arquivo] = new AjaxUpload(id_arquivo, {
			action: obj.pasta+'/upload/'+id_arquivo+'/',
			autoSubmit: false,
			name: 'arquivo',
			onChange : function(file){
				$('input[name='+id_arquivo+']').val(file);
			},
			onSubmit : function(id, fileName){
				upload_f['enviado']++;
			},
			onComplete : function(file){
				upload_f['concluido']++;
				$('#formPPerfil').submit();
			}
		});
	}
};

// VALIDACAO PARA NAO IGNORAR CAMPO OCULTO
$.validator.setDefaults({ ignore: '' });

$(document).ready(function(){
	// PREPARA VARIAVEIS PARA UPLOAD
	uploadPadrao();

	// MASCARA PARA FORMATACAO E MOEDA EM REAL
	// UTILIZA OJQUERY MASKMONEY
	$(".inp_price_pt_br").maskMoney({showSymbol:false,symbol:"R$", decimal:",", thousands:".", allowZero:true});
	$(".inp_price").maskMoney({showSymbol:false,symbol:"R$", decimal:",", thousands:".", allowZero:true});

	// MASCARA PARA PESO
	$('.inp_weight').live('keyup', function(event) {
		maskIt(this,event,'######,###',true);
	});

	if($('.charCount').css('display') && jQuery().counter){
		$('.charCount').each(function(index, element) {
			$(this).counter({
				goal: 'sky',
				msg: '',
				container_class: 'caracteresRestantes'
			});
		});
	}

	// NA LISTAGEM, NO DUPLO CLIQUE DAS COLUNAS EDITAVEIS, EXIBE O CAMPO: INPUT/SELECT
	$('.block table tr td.editavel').live('dblclick', function(){
		var obj = geraObj();
		obj['id'] = $(this).closest('tr').attr('id').substr(5);
		obj['id_cfg_campo'] = $(this).attr('rel');
		obj['campo_tipo'] = $(this).attr('data-tipo');

		$(this).load(obj.pasta+'/editar_campo/', obj, function(data){});
	});

	// NA LISTAGEM, AO ESCOLHER OUTRA OPCAO
	$('.sl_fk_automatico').live('change', function(){
		var obj = geraObj();
		obj['id'] = $(this).closest('tr').attr('id').substr(5);
		obj['id_cfg_campo'] = $(this).attr('rel');
		obj['valor_campo'] = $(this).val();

		if(obj.valor_campo!=''){
			$('#trID-'+obj.id+' td[rel='+obj.id_cfg_campo+']').load(obj.pasta+'/salvar_campo/', obj, function(data){
				// trata retorno personalizado
				if ( typeof callbackChangeList == 'function' ) { 
					callbackChangeList(data);
				}
			});
		}
	});

	// NA LISTAGEM, PROCESSA DADOS AO PRESSIONAR ENTER
	$('.editarNaLista').live('keydown', function(event){
		if(event.keyCode=='13'){
			var obj = geraObj();
			obj['id'] = $(this).closest('tr').attr('id').substr(5);
			obj['id_cfg_campo'] = $(this).attr('rel');
			obj['valor_campo'] = $(this).val();
			
			$('#trID-'+obj.id+' td[rel='+obj.id_cfg_campo+']').load(obj.pasta+'/salvar_campo/', obj, function(data){});
		}
	});

	// NA LISTAGEM, ORDENA GALERIA DE FOTOS
	if($('.sortImages').css('display')){
		$(".sortImages").sortable({
			placeholder: "state-highlight",
			forcePlaceholderSize: true,
			update: function(event, ui) {
				var obj = geraObj();
				obj['str_ordem'] = $(this).sortable('toArray').toString();
				//$('#retorno_ordem').html(obj.str_ordem);

				$.post(obj.pasta+'/salvar_ordem/', obj, function(data){
					if($('.block_content div.message:first').css('display')){
						$('.block_content div.message:first').remove();
					}

					// SE FALHAR DA ERRO
					if(data.rs!='ok')
						flashMessageStatic('erro', 'Erro ao salvar ordenação, por favor tente mais tarde');
				}, "json");
			}
		}).disableSelection();
	}

	// VALIDA A MAIORIA DOS FORMULARIOS
	$('.formPadrao input:submit').live('click', function(){
		var botao_salvar = $(this);
		$('.acao_retorno').val(botao_salvar.attr('rel'));

		for (var i in CKEDITOR.instances){
			CKEDITOR.instances[i].updateElement();
		}
	});

	// SE POSSUI CONFIGURACAO PERSONALIZADA PARA O CKEDITOR
	if($('.novo_config_ck').css('display')){
		var sobrescreve_config = $('.novo_config_ck').val();
		$('.ckeditor').each(function(index, element) {
			var sel = $(this);
			CKEDITOR.replace(sel.attr('id'), { customConfig:sobrescreve_config });
		});
	}

	// Retira mensagens de erro ao escolher uma data
	$('.date_selector td').click(function(){
		$('label.error').remove();
	});

	// Variável para evitar envio duplicado
	var enviandoForm = 0;
	$('.formPadrao').validate({
		/*REGRAS E MENSAGENS DEFINDAS VIA METADATA (VER ATRIBUTO CLASS)*/
		onfocusout: function(element) {
			this.element(element);
		},
		submitHandler: function(form){
			if(enviandoForm==0){
				enviandoForm = 1;

				//
				var acao_retorno = $('.acao_retorno').val();
				$('.buttonsDir input[rel='+acao_retorno+']').replaceWith('<span class="wait '+acao_retorno+'">Aguarde <img src="images/load.gif" width="16" height="16" /></span>');

				var obj = geraObj();

				// ENVIA O FORMULARIO
				$.post(obj.pasta+'/salvar/', $(form).serializeArray(), function(data){
					enviandoForm = 0;
					var html_bt = voltaBotaoSalvar(data.acao_retorno);

					// NAO RETIRA O PRELOADER QUANDO REDIRECIONA
					if(data.acao_retorno!='salvar' && data.acao_retorno!='adicionar' && upload_f['enviado']==upload_f['concluido']){
						$('.buttonsDir .'+data.acao_retorno).replaceWith(html_bt);
					}

					var mensagem = data.msg!=undefined && data.msg!='' ? data.msg : '';

					if(data.rs=='ok'){
						// VARIAVEIS PARA UPLOAD
						var obj_up = geraObj();
						obj_up['id'] = data.id;

						$('.id_registro').val(data.id);

						// PERCORRE ARQUIVOS PARA EXECUTAR UPLOAD
						$.each($('.formPadrao input[type=file]'), function(index, value) { 
							var id_arquivo = $(this).attr('name');

							fazer_upload[id_arquivo].setData(obj_up);
							fazer_upload[id_arquivo].submit();
						});

						// PERMANECE NA PÁGINA
						if(data.acao_retorno=='continuar'){
							// EXIBE BOTAO DE EXCLUSAO
							$('.buttonsDir .btExcluir').removeClass('none');

							// ATUALIZA BOTAO DO PREVIEW
							if(data.url_preview!=undefined && data.url_preview!=''){
								$('.buttonsDir a.urlPreview').removeClass('none').replaceWith('<a href="'+data.url_preview+'" class="botao urlPreview" target="_blank">PREVIEW</a>');
							}
							// ATUALIZA BOTAO DO ENCURTADOR
							if(data.url_final!=undefined && data.url_final!=''){
								$('.gerar_url_googl').removeClass('none').replaceWith('<a href="javascript:void(0);" data-url="'+data.url_final+'" class="gerar_url_googl">Gerar url Goo.gl</a>');
							}

							// Volta o botão do formulário
							//$('.buttonsDir .'+data.acao_retorno).replaceWith(html_bt);

							return false;
						}else{
							if(upload_f['enviado']==upload_f['concluido']){
								var url_go = obj_up.pasta+(data.acao_retorno=='adicionar' ? '/inserir' : '');
								window.location = url_go;
							}
						}
					}else{
						if(mensagem==''){ mensagem = 'Erro'; }
						flashMessageStatic('erro', mensagem);
					}
				}, 'json');
			}

			return true;

		}
	});

	if($('.gerar_url_googl').css('display')){
		// exibe link no formulario de edicao
		if($('.id_registro').val()!=''){
			$('.gerar_url_googl').removeClass('none');
		}

		$('.gerar_url_googl').live('click', function() {
			var sel = $(this);
			var obj = geraObj();

			sel.prev('span').find('img.carregando_url').remove();
			sel.prev('span').append('<img src="images/load2.gif" class="carregando_url" style="position:absolute; top:1px; right:10px; z-index:99;" alt="">');
			$.get(SGI_URL+obj.pasta+'/encurtar_url/'+$('.id_registro').val()+'/?url='+sel.data('url'), function(data){
				if(data.rs=='ok'){
					sel.prev('span').find('input.url_curta').val(data.url_curta);
				}
				sel.prev('span').find('img.carregando_url').remove();
			}, 'json');
		});
	}

	// DELETA IMAGEM NA LISTAGEM (DE UPLOAD MULTIPLO)
	$('ul.imglist .delete a').click(function() {
		if (confirm("Você quer realmente apagar este arquivo?")) {
			var obj = geraObj();
			obj['id'] = $(this).parent('.delete').attr('rel');
			obj['coluna'] = $(this).attr('rel');
			
			$.post(obj.pasta+'/deletar/', obj, function(data){
				if(data.rs=='ok'){
					$('.ulImg_'+data.coluna+'_'+data.id).fadeOut();
				}else{
					var msg = data.msg!=undefined && data.msg!='' ? data.msg : 'Erro ao excluir, tente mais tarde.';
					flashMessageStatic('erro', msg);
				}
			}, 'json');
		}
		return false;
	});

	// DELETA IMAGEM NO FORMULARIO DE EDICAO
	$('.imgPreview a.delete_img').live('click', function(){
		if (confirm("Você quer realmente apagar este arquivo?")) {
			var obj = geraObj();
			obj['id'] = $(this).data('id');
			obj['coluna'] = $(this).data('coluna');

			$.post(obj.pasta+'/deletar/', obj, function(data){
				if(data.rs=='ok'){
					$('.ulImg_'+data.coluna+'_'+data.id+' .imgPreviewImg').fadeOut();
					$('.ulImg_'+data.coluna+'_'+data.id+' div a').fadeOut();

					var id_reg = $('.id_reg').val();
					var table_son = $('.table_son').val();

					// no formulario de edicao
					// se excluir imagem de modulo filho (galeria_imagem) precisa redirecionar
					if(id_reg!='' && table_son!=''){
						window.location = obj.pasta;
					}
				}else{
					var msg = data.msg!=undefined && data.msg!='' ? data.msg : 'Erro ao excluir, tente mais tarde.';
					flashMessageStatic('erro', msg);
				}
			}, 'json');
		}
		return false;
	});

	// Exclusao de um registro da listagem
	$('td.delete a').click(function() {
		if (confirm("Você quer realmente apagar este registro?")) {
			var sel = $(this);
			var obj = geraObj();
			obj['url'] = sel.attr('rel');
			obj['url_retorno'] = sel.data('retorno');

			sel.html('<img src="images/load2.gif" alt="" />');
			var url = $(this).attr('rel');
			$.post(url, obj, function(data){
				if(data.rs=='ok'){
					if(data.url!=undefined){
						window.parent.location = data.url;
					}
				}else{
					var msg = data.msg!=undefined && data.msg!='' ? data.msg : 'Erro ao excluir, tente mais tarde.';
					flashMessageStatic('erro', msg);
				}
			}, 'json');
		}
		return false;
	});

	// Exclusao em massa do itens marcados (listagem)
	$('tfoot tr th .excluir_marcados_lista').click(function(){
		var sel = $(this);
		var obj = geraObj();
		obj['ids'] = [];

		$('.excluir_marcados:checked').each(function(i, rs){
			var sel2 = $(rs);
			obj['ids'].push(sel2.closest('td').data('idregistro'));
		});

		var td = $('.excluir_marcados:checked').closest('td');
		$('.excluir_marcados:checked').replaceWith('<img src="images/load2.gif" alt="" />');

		var request = $.ajax({
			type:'POST',
			dataType:'json',
			url:sel.data('url'),
			data:obj,
			success:function(data, textStatus, jqXHR){
				if(data.rs=='ok'){
					td.closest('tr').remove();
				}else{
					voltarCheckboxMarcados(td, 1);
				}
			},
			error:function( jqXHR, textStatus, errorThrown){
				voltarCheckboxMarcados(td, 1);
			}
		});
	});

	// Centraliza o retorno de remover em lote
	function voltarCheckboxMarcados(td, erro){
		var conteudo = erro==1 ? '<img src="images/error.gif" alt="" />' : '<input type="checkbox" class="excluir_marcados" />';
		td.html(conteudo);
	};


	// DO FORMULARIO, VOLTA PARA A LISTAGEM
	$('.btCancelar').click(function(){
		var obj = geraObj();
		window.location = obj.pasta;
	});

	// DO FORMULARIO, TENTA EXCLUIR REGISTRO
	$('.btExcluir').click(function(){
		var obj = geraObj();
		obj['id'] = $('input.id_registro').val();
		
		var confirma = confirm('Deseja apagar o registro '+obj.id+'?');
		if(confirma){
			$.post(obj.pasta+'/apagar/'+obj.id, obj, function(data){
				if(data.rs=='ok'){
					window.parent.location = obj.pasta;
				}else{
					flashMessageStatic('erro', 'Erro ao excluir, tente mais tarde.');
				}
			}, 'json');
		}
	});

	// HABILITA ORDENACAO DA TABELA E EXIBE ICONE PARA ARRASTAR
	ordenar();
	$('.sortable tr').live('mouseover mouseout', function(event) {
		if (event.type == 'mouseover') {
			$(this).find('td:first').addClass('updown');
		} else {
			$(this).find('td:first').removeClass('updown');
		}
	});

	// TROCA CLASSE DA TR
	$('.block_content table tbody tr').live('mouseover mouseout', function(event) {
		if (event.type == 'mouseover') {
			$(this).addClass('over');
		} else {
			$(this).removeClass('over');
		}
	});

	// SETA CLASSE NAS TRS PARES
	$('.block_content table tr:odd').addClass('even');

	// ATUALIZA MAXIMO DE REGISTROS POR PAGINA (SESSAO)
	$('.printPage select').change(function(){
		var limite = $(this).val();

		$.get(SGI_URL+'sgi/paginacao/'+limite, function(data){
			if(data.rs=='ok'){
				window.location.reload();
			}
		}, 'json');
	});

	// executa uma vez para verificar quem está aberto/oculto
	manualAutomatico();

	// TROCA TIPO DE MÓDULO, POSSUI FILTRO, ORDENACAO, FILHOS, RELACIONAMENTOS
	$('input[name=tipo_modulo], .pFiltrar input[name=filter], .pOrdenar input[name=order], .pFilho input[name=child], .pRelacionamento input[name=relationship]').click(function(){
		manualAutomatico();
	});

	// ESCOLHENDO UMA TABELA, CARREGA DETALHES DE CADA COLUNA
	$('select[name=tabela_automatica]').change(function(){
		tabelaAutomatica($(this).val());
	});
	if($('select[name=tabela_automatica]').css('display')){
		var tabela = $('select[name=tabela_automatica] option:selected').val();
		if(tabela!=''){
			tabelaAutomatica(tabela);
		}
	}

	// ESCOLHENDO TABELA ESTRANGEIRA, CARREGA COLUNAS NA TAG SELECT
	$('.slTabelaFK').live('change', function(){
		var obj = geraObj();
		obj['tabela'] = $(this).val();
		
		$(this).next('.slColunaFK').load(obj.pasta+'/select_colunas', obj);
	});
	
	// TOGGLE DO CAMPO HINT
	$('.tbColunas .tdHint a').live('click', function(){
		$(this).next('div.relative').toggle();
		$(this).closest('tr').toggleClass('toggleHint');
	});

	// TOGGLE NO CAMPO FK
	$('.alternaFK').live('click', function(){
		var marcado = $(this).attr('checked') ? 1 : 0;
		if(marcado==1){
			$(this).next('div.relative').show();
			$(this).closest('tr').addClass('toggleFK');
		}else{
			$(this).next('div.relative').hide();
			$(this).closest('tr').removeClass('toggleFK');
		}
	});
	
	
	$('.remove_Campo').live('click', function(){
		var objeto = $(this).closest('.tr_Campo');
		excluiCFGmodF('cfg_campo', objeto);
		
		objeto.remove();

		var linhas = $('.tbColunas tbody tr.tr_Campo').length;
		if(linhas==0){
			$('.tbColunas tbody').html('<tr><td colspan="10" class="noBG">Todas colunas apagadas</td></tr>');
		}
		auxiliaTR('campos', '.tbColunas tbody .tr_Campo', 'clns-');
	});
	
	////////////////////////////////////////////////////////////////////
	// FILTROS /////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////

	// DUPLICA UMA LINHA APÓS CLICAR NO BOTAO
	$('.add_Filtro').click(function(){
		var linhas = $('.tbFiltros tbody tr.tr_Filtro').length;
		if(linhas==0){
			$('.tbFiltros tbody').html($('.tbOrginal .tr_Filtro').clone());
		}else{
			$('.tbOrginal .tr_Filtro').clone().appendTo('.tbFiltros tbody');
		}
		auxiliaTR('filtros', '.tbFiltros tbody .tr_Filtro', 'fltr-');
	});
	// REMOVE UMA LINHA (TR) DE FILTRO
	$('.remove_Filtro').live('click', function(){
		var objeto = $(this).closest('.tr_Filtro');
		excluiCFGmodF('cfg_filtro', objeto);
		
		objeto.remove();

		var linhas = $('.tbFiltros tbody tr.tr_Filtro').length;
		if(linhas==0){
			$('.tbFiltros tbody').html('<tr><td colspan="7" class="noBG">Sem filtros cadastrados...</td></tr>');
		}
		auxiliaTR('filtros', '.tbFiltros tbody .tr_Filtro', 'fltr-');
	});
	
	// TROCANDO O SELECT DE TABELA, ATUALIZA OS 2 SELECT'S DE COLUNA
	$('.tr_Filtro .tdCampoTabela select').live('change', function(){
		var id_string = $(this).closest('.tr_Filtro').attr('id').substr(5);
		
		var obj = geraObj();
		obj['tabela'] = $(this).val();
		obj['id_tr'] = $(this).closest('.tr_Filtro').attr('id').substr(5);

		$.post(obj.pasta+'/select_colunas/json', obj, function(data){
			if(data.colunas.length>0){
				var opcoes = '';
				$.each(data.colunas, function(index, value) { 
					opcoes += '<option value="'+data.colunas[index].nome+'">'+data.colunas[index].nome+'</option>';
				});
				
				//  ATUALIZA 2 SELECT'S COM ESTAS COLUNAS
				$('#fltr-'+data.id_tr+' .tdCampoMostra select').html(opcoes);
				$('#fltr-'+data.id_tr+' .tdCampoEnvia select').html(opcoes);
			}else{
				$('#fltr-'+data.id_tr+' .tdCampoMostra select').html('<option value="">Selecione a tabela</option>');
				$('#fltr-'+data.id_tr+' .tdCampoEnvia select').html('<option value="">Selecione a tabela</option>');
			}
		}, 'json');
	});
	
	////////////////////////////////////////////////////////////////////
	// ORDEM ///////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////

	// DUPLICA UMA LINHA APÓS CLICAR NO BOTAO
	$('.add_Ordem').click(function(){
		var linhas = $('.tbOrdens tbody tr.tr_Ordem').length;
		if(linhas==0){
			$('.tbOrdens tbody').html($('.tbOrginal .tr_Ordem').clone());
		}else{
			$('.tbOrginal .tr_Ordem').clone().appendTo('.tbOrdens tbody');
		}
		auxiliaTR('ordens', '.tbOrdens tbody .tr_Ordem', 'ordm-');
	});
	// REMOVE UMA LINHA (TR) DE ORDEM
	$('.remove_Ordem').live('click', function(){
		var objeto = $(this).closest('.tr_Ordem');
		excluiCFGmodF('cfg_ordenacao', objeto);
		
		objeto.remove();

		var linhas = $('.tbOrdens tbody tr.tr_Ordem').length;
		if(linhas==0){
			$('.tbOrdens tbody').html('<tr><td colspan="6" class="noBG">Sem ordenações cadastradas...</td></tr>');
		}
		auxiliaTR('ordens', '.tbOrdens tbody .tr_Ordem', 'ordm-');
	});

	////////////////////////////////////////////////////////////////////
	// ACESSSO A MODULO FILHO //////////////////////////////////////////
	////////////////////////////////////////////////////////////////////

	// DUPLICA UMA LINHA APÓS CLICAR NO BOTAO
	$('.add_Filho').click(function(){
		var linhas = $('.tbFilhos tbody tr.tr_Filho').length;
		if(linhas==0){
			$('.tbFilhos tbody').html($('.tbOrginal .tr_Filho').clone());
		}else{
			$('.tbOrginal .tr_Filho').clone().appendTo('.tbFilhos tbody');
		}
		auxiliaTR('filhos', '.tbFilhos tbody .tr_Filho', 'filh-');
	});
	// REMOVE UMA LINHA (TR) DE FILHO
	$('.remove_Filho').live('click', function(){
		var objeto = $(this).closest('.tr_Filho');
		excluiCFGmodF('cfg_acesso', objeto);
		
		objeto.remove();

		var linhas = $('.tbFilhos tbody tr.tr_Filho').length;
		if(linhas==0){
			$('.tbFilhos tbody').html('<tr><td colspan="6" class="noBG">Sem acessos cadastrados...</td></tr>');
		}
		auxiliaTR('filhos', '.tbFilhos tbody .tr_Filho', 'filh-');
	});
	// TROCANDO O SELECT DE TABELA, ATUALIZA O SELECT DO CAMPO
	$('.tr_Filho .tdFilhoTabela select').live('change', function(){
		var obj = geraObj();
		obj['tabela'] = $(this).val();
		obj['id_tr'] = $(this).closest('.tr_Filho').attr('id').substr(5);

		$.post(obj.pasta+'/select_colunas/json', obj, function(data){
			if(data.colunas.length>0){
				var opcoes = '';
				$.each(data.colunas, function(index, value) { 
					opcoes += '<option value="'+data.colunas[index].nome+'">'+data.colunas[index].nome+'</option>';
				});
				
				//  ATUALIZA SELECT
				$('#filh-'+data.id_tr+' .tdFilhoCIntegracao select').html(opcoes);
			}else{
				$('#filh-'+data.id_tr+' .tdFilhoCIntegracao select').html('<option value="">Selecione a tabela</option>');
			}
		}, 'json');
	});
	
	////////////////////////////////////////////////////////////////////
	// ACESSSO A MODULO FILHO //////////////////////////////////////////
	////////////////////////////////////////////////////////////////////

	// DUPLICA UMA LINHA APÓS CLICAR NO BOTAO
	$('.add_Relacionamento').click(function(){
		var linhas = $('.tbRelacionamentos tbody tr.tr_Relacionamento').length;
		if(linhas==0){
			$('.tbRelacionamentos tbody').html($('.tbOrginal .tr_Relacionamento').clone());
		}else{
			$('.tbOrginal .tr_Relacionamento').clone().appendTo('.tbRelacionamentos tbody');
		}
		auxiliaTR('relacionamentos', '.tbRelacionamentos tbody .tr_Relacionamento', 'rltn-');
	});
	// REMOVE UMA LINHA (TR) DE FILHO
	$('.remove_Relacionamento').live('click', function(){
		var objeto = $(this).closest('.tr_Relacionamento');
		excluiCFGmodF('cfg_relacionamento', objeto);
		
		objeto.remove();

		var linhas = $('.tbRelacionamentos tbody tr.tr_Relacionamento').length;
		if(linhas==0){
			$('.tbRelacionamentos tbody').html('<tr><td colspan="5" class="noBG">Sem relacionamentos cadastrados...</td></tr>');
		}
		auxiliaTR('relacionamentos', '.tbRelacionamentos tbody .tr_Relacionamento', 'rltn-');
	});
	// TROCANDO O SELECT DE TABELA, ATUALIZA O SELECT DO CAMPO
	$('.tr_Relacionamento .tdRelacionamentoTabela select').live('change', function(){
		var obj = geraObj();
		obj['tabela'] = $(this).val();
		obj['id_tr'] = $(this).closest('.tr_Relacionamento').attr('id').substr(5);

		$.post(obj.pasta+'/select_colunas/json', obj, function(data){
			if(data.colunas.length>0){
				var opcoes = '';
				$.each(data.colunas, function(index, value) { 
					opcoes += '<option value="'+data.colunas[index].nome+'">'+data.colunas[index].nome+'</option>';
				});
				
				//  ATUALIZA SELECT
				$('#rltn-'+data.id_tr+' .tdRelCampo select').html(opcoes);
			}else{
				$('#rltn-'+data.id_tr+' .tdRelCampo select').html('<option value="">Selecione a tabela</option>');
			}
		}, 'json');
	});
	
	//
	$('.togglePerfil').click(function(){
		$('#dadosView, #dadosForm').toggleClass('none');
	});
	
	$('#formPPerfil').validate({
		rules: {
			nome: {required: true },
			email: {required: true }
		},
		messages: {
			nome: {required: 'Informe o nome'},
			email: {required: 'Informe o e-mail'}
		},
		submitHandler: function(form){
			$('.dvRetorno').html('<div class="message info"><p>Aguarde, processando...</p> <span class="close" title="Dismiss"></span></div>');
			
			var obj = geraObj();
			
			$('#formPPerfil .pBotoes input[type=submit]').hide();
			$('#formPPerfil .pBotoes .wait').removeClass('none');
			
			// ENVIA O FORMULARIO
			$.post(obj.pasta+'/salvar_perfil/', $(form).serializeArray(), function(data){
				$('#formPPerfil .pBotoes input[type=submit]').show();
				$('#formPPerfil .pBotoes .wait').addClass('none');
				
				if(data.rs=='ok'){

					// VARIAVEIS PARA UPLOAD
					var obj_up = geraObj();
					obj_up['id'] = data.id;
					
					// PERCORRE ARQUIVOS PARA EXECUTAR UPLOAD
					$.each($('#formPPerfil input[type=file]'), function(index, value) { 
						var id_arquivo = 'arquivo';
						
						fazer_upload[id_arquivo].setData(obj_up);
						fazer_upload[id_arquivo].submit();	
					});

					var mensagem = data.msg!=undefined && data.msg!='' ? data.msg : 'Redirecionando...';
					flashMessage('sucesso', mensagem);
					
					if(data.url!=undefined && data.url!='' && upload_f['enviado']==upload_f['concluido']){
						window.location = data.url;
					}
				}else{
					flashMessageStatic('erro', 'Erro ao processar informações...');
				}
			}, 'json');
			
			return false;
		}
	});

	$('#formPPerfilSenha').validate({
		rules: {
			senha_antiga: {required: true },
			senha_nova: {required: true, notEqual:"#senha_antiga" },
			senha_nova2: {required: true, equalTo:"#senha_nova" }
		},
		messages: {
			senha_antiga: {required: ' Informe a senha atual'},
			senha_nova: {required: ' Informe a nova senha', notEqual:" A senha precisa ser diferente da atual"},
			senha_nova2: {required: ' Repita a nova senha', equalTo:" A nova senha precisa ser repetida"}
		},
		submitHandler: function(form){
			var obj = geraObj();

			$('#formPPerfilSenha .pBotoes input[type=submit]').hide();
			$('#formPPerfilSenha .pBotoes .wait').removeClass('none');

			// ENVIA O FORMULARIO
			$.post(obj.pasta+'/salvar_senha/', $(form).serializeArray(), function(data){
				$('#formPPerfilSenha .pBotoes input[type=submit]').show();
				$('#formPPerfilSenha .pBotoes .wait').addClass('none');

				var mensagem = data.msg!=undefined && data.msg!='' ? data.msg : 'Aguarde, processando...';
				$('.flashMessage').remove();

				if(data.rs=='ok'){
					flashMessage('sucesso', mensagem);

					if(data.url!=undefined && data.url!=''){
						window.location = data.url;
					}
				}else{
					flashMessageStatic('erro', mensagem);
				}
			}, 'json');
			
			return false;
		}
	});
	
	// GERA SLUG BASEADO NO TÍTULO
	$('.titulo_slug').blur(function(){
		// GERA SE HOUVER O CAMPO SLUG
		if($('input.gerar_slug').css('display')){
			var id = $('.id_registro').val();
			var obj_titulo = $(this);
			var obj = geraObj();
			obj['titulo'] = slugify($.trim(obj_titulo.val()));
			
			// APENAS PARA INSERCAO
			if(id=='' && id!=undefined && obj['titulo']!=''){
				// insere a versao estatica da slug
				obj_titulo.closest('form').find('input.gerar_slug').val(obj['titulo']);
				
				$.post('gerar-slug/', obj, function(data){
					if(data.slug!=undefined && data.slug!=''){
						obj_titulo.closest('form').find('input.gerar_slug').val(data.slug);
					}
				}, "json");
			}
		}
	});
	
	//
	$('.dvPermissao input[type=checkbox]').live('change', function(event){
		var valor = $.trim($(this).val());
		var seletor = false;
		var forcar_valor = 0;
		var valor_forcado = true;
		
		if(valor!=''){
			if(is_numeric(valor)){
				seletor = $(this);
				valor_forcado = false;
			}else{
				var un = $(this).is(':checked')==1 ? 'un': '';
				forcar_valor = $(this).is(':checked')==1 ? 1 : 0;
				if(valor=='listar' || valor=='inserir' || valor=='editar' || valor=='excluir'){
					seletor = $(this).parents('table').find('td input.'+valor+':'+un+'checked');
				}else if(valor=='todas_acoes' || valor=='todos_da_aba'){
					var idCat = $(this).data('aba');
					seletor = $(this).parents('table').find('.trCat'+idCat+' td input:'+un+'checked');
				}else if(valor=='toda_linha'){
					var idMod = $(this).data('idlinha');
					seletor = $('#td_listar'+idMod+' input:'+un+'checked, #td_inserir'+idMod+' input:'+un+'checked, #td_editar'+idMod+' input:'+un+'checked, #td_excluir'+idMod+' input:'+un+'checked');
				}else if(valor=='todos_modulos'){
					seletor = $(this).parents('table').find('td input:'+un+'checked');
					
					if(un=='un'){
						$(this).parents('table').find('td:first input, tr input').attr('checked','checked');
					}else{
						$(this).parents('table').find('td:first input, tr input').removeAttr('checked');
					}
				}
			}
		}

		if(seletor){
			trocaPermissao(seletor, forcar_valor, valor_forcado);
		}
	});
	
	if($('.dvPermissao').css('display')){
		verificaMarcados();
	}
	verificaMarcados();

	// Marcar todas opções no bloco de relacionamentos
	if($('.dvRelacionamentos input.marcarTodos').css('display')){
		function marcaTodosRel(pai){
			var total = pai.find('.itemRel input[type=checkbox]').size();
			var total_marcado = pai.find('.itemRel input[type=checkbox]:checked').size();

			if(total_marcado+1==total){
				pai.find('.marcarTodos').attr('checked', 'checked');
			}else{
				pai.find('.marcarTodos').removeAttr('checked');
			}
		};

		$('.dvRelacionamentos input[type=checkbox]').live('change', function(event){
			var sel = $(this);
			if(!sel.hasClass('marcarTodos')){
				var pai = sel.closest('.dvRelacionamentos');

				if(!sel.is('checked')){
					pai.find('.marcarTodos').removeAttr('checked');
				}

				var total = pai.find('.itemRel input[type=checkbox]').size();
				var total_marcado = pai.find('.itemRel input[type=checkbox]:checked').size();
				marcaTodosRel(pai);
			}
		});

		$('.dvRelacionamentos input.marcarTodos').live('change', function(event){
			var sel = $(this);
			var pai = sel.closest('.dvRelacionamentos');

			if(sel.is(':checked')){
				pai.find('.itemRel input[type=checkbox]').attr('checked', 'checked');
			}else{
				pai.find('.itemRel input[type=checkbox]').removeAttr('checked');
			}
		});

		// VERIFICA SE DEVE MARCAR
		$( ".dvRelacionamentos" ).each(function( index ) {
			marcaTodosRel($(this));
		});
	}

	// ATIVA AUTOCOMPLETE PARA TABELA COM MUITOS REGISTROS (DINAMICAMENTE GERADO)
	if($('.autocomplete_sgi').css('display')){
		$('.autocomplete_sgi').each(function(i, e){
			var tabela = $(this).data('FK_tabela');
			var rotulo = $(this).data('FK_rotulo');
			var campo = $(this).data('campo');
	
			$(this).autocomplete('auto/complete/'+tabela+'/'+rotulo+'/'+campo+'/', {
				width: $(this).innerWidth(),
				selectFirst: false,
				matchCase: true
			}).result(retornoAutocompleteSgi);
		});
	}
	
	// REMOVE UMA LINHA DE CONFIGURACAO JSON (FORM AUTOMATICO)
	$('.remover_linha_json').click(function(){
		$(this).closest('tr').remove();
	});
	
	// ADICIONA UMA LINHA DE CONFIGURACAO (FORM AUTOMATICO)
	$('.json_automatico tfoot .submit').click(function(){
		var seletor = $(this).closest('.json_automatico');
		
		// CLONA LINHA E LIMPA SEU CONTEUDO
		var currentDiv = seletor.find('tbody tr:last');
		currentDiv.clone().insertAfter(currentDiv);
		seletor.find('tbody tr:last input[type=text]').val('');
	});

	// EXIBE/OCULTA TRADUCAO DE UM CAMPO
	$('.tgTraducao').click(function(){
		var sel = $(this);
		sel.next('div').toggle();
	});

	// EXIBE/OCULTA UMA DETERMINADA CLASSE
	$('.tgClass').click(function(){
		var classe = $(this).data('classe');
		$('.'+classe).toggle();
	});

	// EXIBE/OCULTA UMA DETERMINADA CLASSE ATRAVES DE CHECKBOX (MARCADO)
	$('.chClass').change(function(){
		var sel = $(this);
		var alvo = $('.'+sel.data('classe'));

		if(sel.is(':checked')){
			alvo.show();
		}else{
			alvo.hide();
		}
	});

	if(jQuery().strength){
		$('.inp_pass').strength({
			strengthClass: 'strength',
			strengthMeterClass: 'strength_meter',
			strengthButtonClass: 'button_strength',
			strengthButtonText: '',
			strengthButtonTextToggle: 'Ocultar senha'
		});
	}
});

function retornoAutocompleteSgi(event, data, formatted){
	$('.rotulo_autocomplete_'+data[4]).html('ID: '+data[1]);
	$('.valor_autocomplete_'+data[4]).val(data[1]);
};

function voltaBotaoSalvar(rel){
	var html = '';
	if(rel=='continuar'){ html = '<input type="submit" class="submit long" value="Salvar e Continuar" rel="continuar" />'; }
	if(rel=='adicionar'){ html = '<input type="submit" class="submit long" value="Salvar e Adicionar" rel="adicionar" />'; }
	if(rel=='salvar'){ html = '<input type="submit" class="submit long" value="Salvar" rel="salvar" />'; }
	return html;
};

function verificaMarcados(){
	$('.dvPermissao table tr.trMod').each(function(i, e){
		var totalInp = $(this).find('input[type=checkbox]:not([value=toda_linha])').length;
		var totalMarcado = $(this).find('input[type=checkbox]:checked:not([value=toda_linha])').length;
		
		if(totalInp==totalMarcado){
			$(this).find('input[type=checkbox][value=toda_linha]').attr('checked', 'checked');
		}else{
			$(this).find('input[type=checkbox][value=toda_linha]').removeAttr('checked');
		}
	});

	$('.dvPermissao table tr.trSub').each(function(i, e){
		var totalInp = 0;
		var totalMarcado = 0;

		if(totalInp==totalMarcado){
			// PRECISA TRATAR SUBCATEGORIAS
			var sel2 = $(this).find('input:checkbox');
			//alert(sel2.data('subs'))
			$(this).find('input[type=checkbox][value=todas_acoes]').attr('checked', 'checked');
		}else{
			$(this).find('input[type=checkbox][value=todas_acoes]').removeAttr('checked');
		}
	});

	$('.dvPermissao table tr td input[value=todos_da_aba]').each(function(i, e){
		var sel = $(this);
		var aba = sel.data('aba');
		var total = parseInt(sel.data('modulos'));

		var marcados = parseInt($('.trCat'+sel.data('aba')+' input[type=checkbox][value=toda_linha]:checked').length);

		if(marcados==total){
			sel.attr('checked', 'checked');
		}else{
			sel.removeAttr('checked');
		}
	});

	$('.dvPermissao table thead input[type=checkbox]').each(function(i, e){
		var sel = $(this);
		var acao = sel.val();

		if(acao!='todos_modulos'){
			var total_coluna = $('.dvPermissao table input[type=checkbox].'+acao+':not(:checked)').length;
			if(total_coluna==0){
				sel.attr('checked', 'checked');
			}else{
				sel.removeAttr('checked');
			}
		}
	});
};

function trocaPermissao(seletor, forcar_valor, valor_forcado){
	seletor.each(function(i, e){
		var obj = geraObj();
		obj['id_modulo'] = $.trim($(this).val());
		obj['marcar_como'] = $(this).is(':checked') ? 1 : 0;
		if(valor_forcado==true){
			obj['marcar_como'] = forcar_valor;
		}
		obj['acao'] = $(this).attr('class');
		obj['id_grupo'] = $('.id_cfg_grupo').val();
		
		if(is_numeric(obj.id_modulo)){
			$('#td_'+obj.acao+obj.id_modulo).html('<img src="images/ajax-loader.gif"alt=""/>');
			$.post(obj.pasta+'/troca_permissao/', obj, function(data){
				var marcado = data.marcar_como==1 ? ' checked="checked"': '';
				$('#td_'+data.acao+data.id_modulo).html('<input type="checkbox" value="'+data.id_modulo+'" class="'+data.acao+'"'+marcado+' />');
				verificaMarcados();
			}, "json");
		}
	});
};


function mover_ate(seletor){
	$('html,body').animate({
		scrollTop: $(seletor).offset().top
	}, 2000);
};

/* cfg_modulo/form_colunas */
function changeSelectColunas(arr_colunas, seletor){
	var opcoes = '';
	$.each(arr_colunas, function(index, value) { 
		opcoes += '<option value="'+arr_colunas[index]+'">'+arr_colunas[index]+'</option>';
	});
	
	if(opcoes!=''){
		$(seletor+' select').html(opcoes);
		// ATUALIZA SELECIONADO (EDICAO)
		//var selecionado = $(seletor+' select').next('input.valor_selecionado').val();
		
		$(seletor+' select').removeAttr('selected');
		$(seletor+' select').each(function(i) {
			var selecionado = $(this).next('input.valor_selecionado').val();
			$(this).find('option[value='+selecionado+']').attr('selected', 'selected');
		});
		
		//$(seletor+' select option[value='+selecionado+']').attr('selected', 'selected');
	}else{
		$(seletor+' select').html('<option value="">Selecione a tabela</option>');
	}
};

function excluiCFGmodF(tabela, objeto){
	var obj = geraObj();
	obj['id_tr'] = objeto.attr('id');
	obj['tabela_excluir'] = tabela;
	obj['id_excluir'] = objeto.find('.id_cfgmodf').val();

	$.post(obj.pasta+'/excluir_da_tabela', obj, function(data){ /*SE PRECISAR RETORNAR ALGO*/ }, 'json');
};

// PEGA INFORMAÇÕES DE UMA TABELA NO FORMULÁRIO DE MÓDULO
function tabelaAutomatica(tabela){
	var obj = geraObj();
	obj['tabela'] = tabela;
	obj['id'] = $('.id_registro').val();

	$('.dvDadosColunas').load(obj.pasta+'/informacoes_tabela', obj, function(html_retornando){
		$('.dvDadosColunas').html(html_retornando);
		
		$('input.alternaFK').each(function(index, element) {
			var seletor = $(this);
			if(seletor.is(':checked')){
				seletor.next('div.relative').show();
				seletor.closest('tr').addClass('toggleFK');
			}else{
				seletor.next('div.relative').hide();
				seletor.closest('tr').removeClass('toggleFK');
			}
		});
	});
	manualAutomatico();
}

// ABRE/OCULTA CAMPOS NO FORMULÁRIO DE MÓDULO (UTIL) QUANDO A PÁGINA É ATUALIZADA
function manualAutomatico(){
	var tipo_modulo = $('input[name=tipo_modulo]:checked').val();
	
	// SE ESCOLHEU UMA TABELA
	var tabela = $('select[name=tabela_automatica] option:selected').val();
	if(tabela==''){
		$('.pOrdenar, #divOrder').hide();
	}else{
		$('.pOrdenar, #divOrder').show();
	}
	
	// SE AUTOMATICO
	if(tipo_modulo==1){
		$('#automatico').show();
		$('#manual').hide();
	}else{
		$('#automatico').hide();
		$('#manual').show();
	}
	
	// SE TEM FILTRO
	var filtro = $('.pFiltrar input[name=filter]:checked').val();
	if(filtro==1){
		$('#divFilter').show();
	}else{
		$('#divFilter').hide();
	}
	
	// SE ORDEM PADRAO
	var ordem = $('.pOrdenar input[name=order]:checked').val();
	if(ordem==1){
		$('#divOrder').show();
	}else{
		$('#divOrder').hide();
	}
	
	// SE ACESSA MODULO FILHO
	var filho = $('.pFilho input[name=child]:checked').val();
	if(filho==1){
		$('#divChild').show();
	}else{
		$('#divChild').hide();
	}
	
	// SE POSSUI RELACIONAMENTOS
	var filho = $('.pRelacionamento input[name=relationship]:checked').val();
	if(filho==1){
		$('#divRel').show();
	}else{
		$('#divRel').hide();
	}
};

// APLICA CSS E OUTROS ATRIBUTOS NAS TR'S GERADAS DINAMICAMENTE (FORMULÁRIO DE MÓDULO)
function auxiliaTR(tipo, seletorTR, baseID){
	ordenar(tipo);
	$(seletorTR).removeAttr('id').removeClass('even');
	$(seletorTR+':even').addClass('even');
	$(seletorTR).each(function(index) {
		var indice = index+1;
		$(this).attr('id',baseID+indice);
		
		// PERCORRE OS INPUTS E SELECTS PARA ATRIBUIR INDICE
		$(this).find("input[name$='[]']").each(function(index){
			var newName = $(this).attr('name').replace('[]','['+indice+']');
			$(this).attr('name', newName);
		});
		$(this).find("select[name$='[]']").each(function(index){
			var newName = $(this).attr('name').replace('[]','['+indice+']');
			$(this).attr('name', newName);
		});
	});
};

// ORDENACAO PADRAO
function ordenar(){
	if($('.sortable').css('display')){
		var argumento = arguments[0]!='' && arguments[0]!=undefined ? arguments[0] : '';

		$('.sortable').tableDnD({
			dragHandle: '.dragHandle',
			onDrop: function(table, row) {
				
				var rows = table.tBodies[0].rows;
				var debugStr = '';
				var nRow = '';
				
				zebrarTabela();
				
				if(argumento=='colunas' || argumento=='filtros' || argumento=='ordens' || argumento=='filhos' || argumento=='relacionamentos'){
					for (var i=0; i<rows.length; i++) {
						 nRow = rows[i].id;
						 $('#'+nRow+' .'+argumento+'_ordem').val(i+1);// atualiza campo oculto com a ordem
					}
				}else{
					// MODO PADRAO
					for (var i=0; i<rows.length; i++) {
						 nRow = rows[i].id;
						 debugStr += nRow.substr(5)+'-';
					}
					debugStr = debugStr.substr(0,debugStr.length-1);

					var id_reg = $('.id_reg').val();
					var pasta = $('.table_name').val();
					var pasta_sub = $('.table_sub').val();
					var pasta_son = $('.table_son').val();
					
					var obj = {};
					obj['arrayIds'] = debugStr;
					obj[$('input.csrf_name').val()] = $('input.csrf_hash').val();
					$('#resultado_'+pasta).load(pasta+(pasta_sub!='' ? '/'+pasta_sub : '')+(id_reg>0 ? '/'+id_reg+(pasta_son!='' ? '/'+pasta_son : '') : '')+'/ordenar/'+argumento, obj);
				}
			}
		});
	}
};

function preencheCoordenada(coordenada){
	$('input[name=google_map], input.google_coordenada').val(coordenada);
	Shadowbox.close();
};

// CSS PADRAO PARA LISTA
function zebrarTabela(){
	$('.block_content table tr').removeClass('even');
	$('.block_content table tr:odd').addClass('even');
};

// TOGGLE DE CHECKBOX
function enumPage(id,n,campo){
	var obj = geraObj();
	obj['id'] = id;
	obj['campo'] = campo;
	obj[campo] = n;

	$('#trID-'+id+' .'+campo).html('<img src="images/ajax-loader.gif" />');
	$('#trID-'+id+' .'+campo).load(obj.pasta+'/enum/', obj, function(data){
		if(campo=='libera'){
			var verifica = $('#trID-'+id+' .'+campo+' input:checked').length;
			$('#trID-'+id).removeClass('libera0');
			if(verifica==0){
				$('#trID-'+id).addClass('libera0');
			}
		}
	});
};

// PRIMEIRA LETRA MAIUSCULA (PHP)
function ucfirst (str) {
	var f = str.charAt(0).toUpperCase();
	return f + str.substr(1);
};

// VERIFICA SE VARIÁVEL É STRING (PHP)
function is_string (mixed_var) {
	return (typeof(mixed_var) == 'string');
};

// VERIFICA SE VARIÁVEL É NÚMERO (PHP)
function is_numeric( mixed_var ) {
	if (mixed_var === '') {
		return false;
	}
	
	return !isNaN(mixed_var * 1);
};


/**  
  * Função para Máscara 
  * @param w - O elemento que será aplicado (normalmente this).
  * @param e - O evento para capturar a tecla e cancelar o backspace.
  * @param m - A máscara a ser aplicada.
  * @param r - Se a máscara deve ser aplicada da direita para a esquerda. Veja Exemplos.
  * @param a - 
  * @returns null  
  */
function maskIt(w,e,m,r,a){
    // Cancela se o evento for Backspace
    if (!e) var e = window.event
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    
    // Variáveis da função
    var txt  = (!r) ? w.value.replace(/[^\d]+/gi,'') : w.value.replace(/[^\d]+/gi,'').reverse();
    var mask = (!r) ? m : m.reverse();
    var pre  = (a ) ? a.pre : "";
    var pos  = (a ) ? a.pos : "";
    var ret  = "";

    if(code == 9 || code == 8 || txt.length == mask.replace(/[^#]+/g,'').length) return false;

    // Loop na máscara para aplicar os caracteres
    for(var x=0,y=0, z=mask.length;x<z && y<txt.length;){
        if(mask.charAt(x)!='#'){
            ret += mask.charAt(x); x++;
        } else{
            ret += txt.charAt(y); y++; x++;
        }
    }
    
    // Retorno da função
    ret = (!r) ? ret : ret.reverse()    
    w.value = pre+ret+pos;
};

// Novo método para o objeto 'String'
String.prototype.reverse = function(){
    return this.split('').reverse().join('');
};


$.extend({
    keyCount : function(o) {
        if(typeof o == "object") {
            var i, count = 0;
            for(i in o) {
                if(o.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count;
        } else {
            return false;
        }
    }
});

/**
* Função Responsável por rolar a div de FlashMessageConform o usuário rola
*/
function fixDiv() {
  var $cache = $('.flashMessage'); 
  if ($(window).scrollTop() > 0) 
	 $cache.css({'position': 'fixed', 'top': '0px'}); 
  else
	 $cache.css({'position': 'absolute', 'top': 'auto'});
};

 

/**
 * Flash Message que sai da tela apos alguns (SlideUp 2500)
 * @param type - (atencao, erro, sucesso)
 * @param msg - Mensagem a ser mostrada na mensagems
 */ 
function flashMessage(type,msg)
{
	$('.flashMessage').remove();
	jQuery('body') 
	  .prepend("<div class='flashMessage "+type+"'>"
		  +"<div class='wrapper'>"
		  +    "<div>"
		  +    "<a href='javascript:void(0);javascript:fecha_flashMessage();' title='fechar' id='ds_fechar_flashMessage'>Fechar</a>"
		  +    msg
		  +    "</div>"
		  +"</div>"
	+"</div>");
	
	$(".flashMessage").delay(2500).slideUp();
	fixDiv();
};

/**
 * Flash Message que se mantem na tela
 * @param type - (atencao, erro, sucesso)
 * @param msg - Mensagem a ser mostrada na mensagems
 */ 
function flashMessageStatic(type,msg){
	jQuery('body') 
	  .prepend("<div class='flashMessage "+type+"'>"
		  +"<div class='wrapper'>"
		  +    "<div>"
		  +    "<a href='javascript:void(0);javascript:fecha_flashMessage();' title='fechar' id='ds_fechar_flashMessage'>Fechar</a>"
		  +    msg
		  +    "</div>"
		  +"</div>"
	+"</div>");
	fixDiv();
};

//Função que da um slideUp na flash message
function fecha_flashMessage(){
	$('.flashMessage').slideUp();
};

















window.onload = function(){
$(function() {
	// DESFAZ ACAO DO SCRIPT PADRAO
	$('.area table tr td').css('background', 'none');
	$('.area table tr').mouseover(function(){
		$(this).closest('table').find('td').css('background', 'none');
	});

	// toggle dos fieldsets
	$('.area .toggle').click(function(){
		$(this).closest('.area').toggleClass('fechado');
	});

	// BUSCA FILTRO/VALOR
	$('.dvFiltroValores .topo .busca .bt').click(function(){
		verificaBuscaFiltroValor(true, $(this).closest('.fsFiltro'));
	});
	$('.dvFiltroValores .topo .busca input[type=text]').keyup(function(event){
		verificaBuscaFiltroValor(false, $(this).closest('.fsFiltro'));
	});

	// EVITA ENVIO DO FORMULARIO
	$('.dvFiltroValores .topo input[type=text]').keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});

	// Exibe o formulário para buscar link (registros relacionados)
	$('.abreLinkRelacionado').click(function(){
		var sel = $(this);
		sel.next('.buscaLink').removeClass('none');
		sel.remove();
	});

	// Processa a verificação do link
	$('.dvFiltroValores .topo .buscaLink .bt').click(function(){
		var fsSeletor = $(this).closest('.fsFiltro')

		var url = $.trim(fsSeletor.find('.dvFiltroValores .topo .buscaLink input[type=text]').val());
		var id = $('.id_registro').val();
		var n = "\n";
		var t = "\t";
		var t9 = t+t+t+t+t+t+t+t+t;

		if(url==''){
			fsSeletor.find('.buscaLink').addClass('erro');
		}else{
			fsSeletor.find('.topo .buscaLink').removeClass('erro');

			var obj = geraObj();
			obj['url'] = url;
			obj['tabela'] = fsSeletor.data('tabela');
			obj['tabela_relacional'] = fsSeletor.data('tabela_relacional');
			obj['campo_mostra'] = fsSeletor.data('campo_mostra');

			fsSeletor.find('.buscaLink .load').show();
			$.post('verifica-link-filtro/', obj, function(data){
				// CONTEUDO DE CADA LINHA
				var lis = '';
				$.each(data.resultados, function(i, rs){
					lis += n+t9+'<li class="li_item" data-idregistro="'+rs.id+'" data-tabela="'+data.tabela+'">';
					lis += n+t9+t+rs.valor;
					lis += n+t9+t+'<input type="hidden" name="relc['+data.tabela+'][]" value="'+rs.id+'" />';
					lis += n+t9+'</li>';
				});

				// ESCREVE TAGS
				fsSeletor.find('.itens_filtros.cadastradas').append(lis);
				fsSeletor.find('.buscaLink .load').hide();

				toggleBotoesColuna(fsSeletor);
			}, "json");

		}
	});

	// CLICA (SELECIONA) UMA FILTRO/VALOR
	$('.fsFiltro .dvFiltroValores ul li').live('click', function(){
		$(this).toggleClass('marcado');
	});

	// TRANSFERENCIA DE FILTRO/VALORES (ADICAO OU REMOCAO)
	$('.colBotoes a').click(function(){
		var seletor = $(this);
		var acao = seletor.attr('class');
		var sub_acao = acao.substr(0, 8);// adiciona || retirar
		
		// VARIAVEIS PARA DEFINIR: TODOS OU MARCADOS
		var classe = sub_acao=='adiciona' ? 'resultado' : 'cadastradas';
		var sub_classe = acao.substr(-6)=='-todos' ? '' : '.marcado';
		var str_seletor = '.itens_filtros.'+classe+' li.li_item'+sub_classe;
		var total = $(str_seletor).length;
		var tabela = seletor.closest('.fsFiltro').data('tabela');
		var tabela_relacional = seletor.closest('.fsFiltro').data('tabela_relacional');
		
		var lis = '';
		$(str_seletor).each(function() {
			var seletor2 = $(this);
			var id_Reg = seletor2.data('idregistro');
			lis += '<li data-idregistro="'+id_Reg+'" class="li_item">'+seletor2.html()+'</li>';
			seletor2.fadeOut('slow', function(){ seletor2.remove(); });
		});
		
		if(lis!=''){
			if(acao=='adicionar' || acao=='adicionar-todos'){
				seletor.closest('.fsFiltro').find('ul.itens_filtros.cadastradas').removeClass('none').append(lis);
				seletor.closest('.fsFiltro').find('.colBotoes .retirar').removeClass('none');
				seletor.closest('.fsFiltro').find('.colBotoes .retirar-todos').removeClass('none');
				
				// PERCORRE UL PARA ADICIONAR O CAMPO OCULTO EM CADA LI
				seletor.closest('.fsFiltro').find('ul.itens_filtros.cadastradas li').each(function(index, element) {
					//:not(:has(input[type=hidden]))
					var seletor_li = $(this);
					if(seletor_li.find('input[type=hidden]').val()==undefined){
						seletor_li.append('<input type="hidden" name="relc['+tabela+'][]" value="'+seletor_li.data('idregistro')+'" />');
					}
				});
			}
			if(acao=='retirar' || acao=='retirar-todos'){
				seletor.closest('.fsFiltro').find('ul.itens_filtros.resultado').removeClass('none').append(lis);
				seletor.closest('.fsFiltro').find('ul.itens_filtros.resultado input[type=hidden]').remove();
			}
		}
	});
});

function verificaBuscaFiltroValor(envia, fsSeletor){
	var termo = $.trim(fsSeletor.find('.dvFiltroValores .topo .busca input[type=text]').val());
	var id = $('.id_registro').val();
	var n = "\n";
	var t = "\t";
	var t9 = t+t+t+t+t+t+t+t+t;

	if(termo==''){
		fsSeletor.find('.busca').addClass('erro');
	}else{
		fsSeletor.find('.topo .busca').removeClass('erro');

		if(envia){
			var obj = geraObj();
			obj['termo'] = termo;
			obj['tabela'] = fsSeletor.data('tabela');
			obj['tabela_relacional'] = fsSeletor.data('tabela_relacional');
			obj['campo_mostra'] = fsSeletor.data('campo_mostra');

			fsSeletor.find('.busca .load').show();
			$.post('consultar-filtro/', obj, function(data){
				// CONTEUDO DE CADA LINHA
				var lis = '';
				$.each(data.resultados, function(i, rs){
					lis += n+t9+'<li class="li_item" data-idregistro="'+rs.id+'" data-tabela="'+data.tabela+'">'+rs.valor+'</li>';
				});
				
				// ESCREVE TAGS
				fsSeletor.find('.itens_filtros.resultado').html(lis);
				fsSeletor.find('.busca .load').hide();
				
				toggleBotoesColuna(fsSeletor);
			}, "json");
		}
	}
};

// OCULTA EXIBE BOTOES BASEADO NO CONTEUDO DAS LISTAS
function toggleBotoesColuna(fsSeletor){
	var seletor_ul = fsSeletor.find('.itens_filtros.resultado');
	var seletor_ul_alvo = fsSeletor.find('.itens_filtros.cadastradas');
	var seletor_add1 = fsSeletor.find('.colBotoes .adicionar');
	var seletor_add2 = fsSeletor.find('.colBotoes .adicionar-todos');
	var seletor_remove1 = $('.colBotoes .retirar');
	var seletor_remove2 = $('.colBotoes .retirar-todos');
	
	if(seletor_ul.find('li.li_item').size() > 0){
		seletor_ul.removeClass('none');
		seletor_add1.removeClass('none');
		seletor_add2.removeClass('none');
	}else{
		seletor_ul.addClass('none');
		seletor_add1.addClass('none');
		seletor_add2.addClass('none');
	}

	if(seletor_ul_alvo.find('li.li_item').size() > 0){
		seletor_ul_alvo.removeClass('none');
		seletor_remove1.removeClass('none');
		seletor_remove2.removeClass('none');
	}else{
		seletor_ul_alvo.addClass('none');
		seletor_remove1.addClass('none');
		seletor_remove2.addClass('none');
	}
};
}

var slugify = function(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç";
  var to   = "aaaaaeeeeeiiiiooooouuuunc";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str;
};