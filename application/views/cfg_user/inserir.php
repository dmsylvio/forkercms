
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href="<?php echo base_url(); ?>">

	<title>dothNews</title>
	<meta name="title" content="Usuários do dothnews • Inserir">
	<meta name="description" content="">
	<meta name="keywords" content="">

	<meta name="robots" content="follow,all">
	<meta http-equiv="Content-Language" content="pt-br">
	<meta http-equiv="X-UA-Compatible" content="IE=7">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<link href="images/favicon-dothnews.ico" rel="SHORTCUT ICON" type="image/x-icon">
	<!--CSS-->
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/jquery.wysiwyg.css">
	<link rel="stylesheet" href="css/facebox.css">
	<link rel="stylesheet" href="css/visualize.css">
	<link rel="stylesheet" href="css/date_input.css">
	<link rel="stylesheet" href="js/fileuploader/fileuploader.css">
	<link rel="stylesheet" href="css/colorpicker.css">
	<link rel="stylesheet" href="js/shadowbox-3.0.3/shadowbox.css">
	<link rel="stylesheet" href="js/strength-pass/strength.css">


	<!--[if lt IE 8]><link rel="stylesheet" href="css/ie.css"><![endif]-->

</head>
<body>
	<div id="hld">
		<div class="wrapper">
			<!--MENU-->
			<?php $this->load->view('dashboard/menu'); ?>
						
			<!--FORMULARIO-->
			<div class="block">
				<div class="block_head">
					<div class="bheadl"></div>
					<div class="bheadr"></div>
					<h2>Usuários  do dothnews</h2>
					<ul class="insert">     
						<li><a href="cfg_user/inserir">INSERIR</a></li>
					</ul>
				</div>
				
				<div class="block_content">
					<div class="breadcrumbArea">
						<p class="breadcrumb"><a href="cfg_user/listar">Usuários do dothnews</a> &raquo; <strong>Inserir</strong></p>
					</div>
					
					<div id="retornoLogin">
						<?php $error = $this->session->flashdata('error'); ?>
						<?php if (isset($error)): ?>
							<div class="message errormsg">
								<p><?php echo $error; ?></p>
							</div>
						<?php endif; ?>

						<?php $sucess = $this->session->flashdata('sucess'); ?>
						<?php if (isset($sucess)): ?>
							<div class="message success">
								<p><?php echo $sucess; ?></p>
							</div>
						<?php endif; ?>
					</div>
				
					<?php echo form_open_multipart('', array('id' => 'formPadraoUser')); ?>

						<p>
							<label>Grupo</label><br>
							<select name="id_cfg_grupo" class="selNormal">
								<option value="">selecione um grupo</option>
								<?php 
								foreach($all_cfg_grupo as $cfg_grupo)
								{
									$selected = ($cfg_grupo['id_cfg_grupo'] == $this->input->post('id_cfg_grupo')) ? ' selected="selected"' : "";

									echo '<option value="'.$cfg_grupo['id_cfg_grupo'].'" '.$selected.'>'.$cfg_grupo['cfg_grupo'].'</option>';
								} 
								?>
							</select>
						</p>
						<p>
							<label>Nome:</label><br>
							<input type="text" class="text {required:true, messages:{required:'Informe'}}" name="nome" value="<?php echo $this->input->post('nome'); ?>">
						</p>
						<p>
							<label>E-mail:</label><br>
							<input type="text" class="text {required:true, messages:{required:'Informe'}}" name="email" value="<?php echo $this->input->post('email'); ?>">
						</p>
						<p>
							<label>Senha:</label>
							<small><a href="http://wiki.dothcom.net/index.php/Dicas_para_criar_senhas_seguras" target="_blank">Dicas para criar senhas seguras</a></small>
							<br>
							<small>
								Sua senha deve conter pelo menos 8 caracteres e com letras maiúsculas, minúsculas, números e símbolos.
							</small><br>
							<input type="password" id="senha_user" class="text inp_pass {required:'#requer_senha:checked', messages:{required:'Informe'}}" name="senha" value="<?php echo $this->input->post('password'); ?>">
							<input type="checkbox" value="1" name="alterar_senha" id="requer_senha" checked="checked" style="visibility:hidden;">							
						</p>
						<p>
							<label>Telefone:</label><br>
							<input type="text" class="text fone" name="telefone" value="<?php echo $this->input->post('telefone'); ?>">
						</p>
						<p>
							<label>Celular:</label><br>
							<input type="text" class="text fone" name="celular" value="<?php echo $this->input->post('celular'); ?>">
						</p>
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<th width="55" style="border:0;"><a href="images/sem-foto.gif" class="imgMini" rel="facebox"><img src="images/sem-foto.gif" alt=""></a></th>
								<th width="520" style="border:0;">
									<p class="fileupload" style="margin:0 0 0 -10px; padding:0;">
										<label>Imagem do Usuário:</label><br>
										<input type="file" id="arquivo" name="arquivo">
										<span id="uploadmsg">Max 3Mb</span>
									</p>
								</th>
							</tr>
						</table>
						<p>
							<label>Registros por Página:</label><br>
							<?php echo form_radio('limite_registro', '5', FALSE, array('class' => 'radio', 'id' => 'cb_limite_0')); ?> <label for="cb_limite_0">5</label>
							<?php echo form_radio('limite_registro', '20', TRUE, array('class' => 'radio', 'id' => 'cb_limite_1')); ?> <label for="cb_limite_1">20</label>
							<?php echo form_radio('limite_registro', '40', FALSE, array('class' => 'radio', 'id' => 'cb_limite_2')); ?> <label for="cb_limite_2">40</label>
							<?php echo form_radio('limite_registro', '100', FALSE, array('class' => 'radio', 'id' => 'cb_limite_3')); ?> <label for="cb_limite_3">100</label>
							<?php echo form_radio('limite_registro', '200', FALSE, array('class' => 'radio', 'id' => 'cb_limite_4')); ?> <label for="cb_limite_4">200</label>
						</p>
						<p>
							<?php echo form_checkbox('publica_conteudo', '1', FALSE, array('class' => 'checkbox', 'id' => 'cb_publica'));?> <label for="cb_publica">Este usuário pode publicar conteúdo</label>
						</p>
						<p>
							<?php echo form_checkbox('libera', '1', TRUE, array('class' => 'checkbox', 'id' => 'cb_libera'));?> <label for="cb_libera">Online</label>
						</p>
						<hr>
						<p class="pBotoes">
						
							
							<input type="button" class="submit mid gray btCancelar" value="Cancelar">
							
							<div class="buttonsDir">
								<input type="button" class="submit gray btExcluir none" value="Excluir">
								<input type="submit" class="submit mobileNao long" value="Salvar e Continuar" rel="continuar">
								<input type="submit" class="submit mobileNao long" value="Salvar e Adicionar" rel="adicionar">
								<input type="submit" class="submit long" value="Salvar" rel="salvar">
							</div>
							
							<input type="hidden" class="id_registro" name="id_cfg_user" value="">
							<input type="hidden" class="acao_retorno" name="acao_retorno" value="salvar">
							<input type="hidden" class="id_reg" value="">
							<input type="hidden" class="table_son" value="">
							<input type="hidden" class="table_name" value="cfg_user">
						</p>
					<?php echo form_close(); ?>
				</div>
				
				<div class="bendl"></div>
				<div class="bendr"></div>
			</div>

			<input type="hidden" class="id_reg" value="">
			<input type="hidden" class="table_name" value="cfg_user">
			<input type="hidden" class="table_sub" value="">
			<input type="hidden" class="table_son" value="">
			<input type="hidden" class="csrf_name" value="<?php echo $this->security->get_csrf_token_name(); ?>">
			<input type="hidden" class="csrf_hash" value="<?php echo $this->security->get_csrf_hash(); ?>">

			<?php $this->load->view('dashboard/footer'); ?>
		</div>
		<!-- wrapper ends -->

	</div>
	<!-- #hld ends -->


	<!--[if IE]><script type="text/javascript" src="js/excanvas.js"></script><![endif]-->	

	<script type="text/javascript">
	// VARIAVEL ABSOLUTA PARA EVITAR A QUEBRA EM ALGUNS REDIRECIONAMENTOS
	var SGI_URL = "<?php echo base_url(); ?>";
	var UPLOAD_MODEL_MAX_FILESIZE_UPLOAD = "10";
	var UPLOAD_MODEL_MAX_DIMENSION_IMAGE = "5000";
	var UPLOAD_REMOTE_ENABLED = "0";
	var UPLOAD_REMOTE_URL = "";

	// Essa variavel define qual vai ser a pasta do FCKEditor no servidor remoto
	var UPLOAD_REMOTE_CKEDITOR_DIR = 'ckeditor';// exemplo: ckeditor, fckeditor, images
	</script>

	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js"></script>
	<style>
		.qq-uploader{
			background-color: #FCFCFC;
			border: 2px dashed #CCC;
			margin-bottom: 10px;
			text-align: center;
		}
		.qq-uploader .qq-upload-drop-area{
			display: block!important;
		}
		.qq-uploader .qq-upload-drop-area.qq-upload-drop-area-active,
		.qq-upload-drop-area-active{
			border-color:#0087F7!important;
		}
		.qq-uploader .qq-upload-drop-area span{
			display: block;
			position: absolute;
			top: 50px;
		}
		.qq-uploader .qq-upload-button{
			display: block;
			position: relative;
			padding-top: 20px;
			margin-bottom: 10px;
		}
		.qq-uploader .qq-upload-button input.file{
			width: 100%;
			height: 100%;
		}
		.qq-uploader ul.qq-upload-list{
			padding: 0!important;
		}
		.qq-uploader ul.qq-upload-list li{
			text-align: left;
		}
	</style>

	<script type="text/javascript" src="js/jquery.img.preload.js"></script>
	<script type="text/javascript" src="js/jquery.wysiwyg.js"></script>
	<script type="text/javascript" src="js/jquery.date_input.pack.js"></script>
	<script type="text/javascript" src="js/facebox.js"></script>
	<script type="text/javascript" src="js/jquery.visualize.js"></script>
	<script type="text/javascript" src="js/jquery.visualize.tooltip.js"></script>
	<script type="text/javascript" src="js/jquery.select_skin.js"></script>
	<script type="text/javascript" src="js/jquery.tablesorter.min.js"></script>
	<script type="text/javascript" src="js/ajaxupload.js"></script>
	<script type="text/javascript" src="js/jquery.pngfix.js"></script>
	<script type="text/javascript" src="js/meus-metodos.js"></script>
	<script type="text/javascript" src="js/jquery.metadata.js"></script>
	<script type="text/javascript" src="js/jquery.tablednd.0.7.min.js"></script>
	<script type="text/javascript" src="js/fileuploader/fileuploader.js"></script>
	<script type="text/javascript" src="js/jquery.maskMoney.js"></script>
	<script type="text/javascript" src="js/jquery.maskedinput-1.3.min.js"></script>
	<script type="text/javascript" src="js/shadowbox-3.0.3/shadowbox.js"></script>
	<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="js/ckeditor/adapters/jquery.js"></script>
	<script type="text/javascript" src="js/colorpicker.js"></script>
	<script type="text/javascript" src="js/jquery.word-and-character-counter.min.js"></script>
	<script type="text/javascript" src="js/strength-pass/strength.js"></script>

	<script type="text/javascript" src="js/jquery.autocomplete.min.js"></script>

	<script type="text/javascript" src="js/sgi.js"></script>
	<script type="text/javascript" src="js/custom.js"></script>

	<script type="text/javascript">
	Shadowbox.init();

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-89050060-1', 'capitaldopantanal.com.br');
	ga('send', 'pageview');

	$(document).ready(function(){
		$(".breadcrumbArea").scrollLeft( 10000 );
	});
	</script>

	<!--<script type="text/javascript" src="application/views/cfg_user/cfg_user.js"></script>-->
</body>
</html>