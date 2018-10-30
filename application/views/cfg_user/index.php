
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href="<?php echo base_url(); ?>">

	<title>dothNews</title>
	<meta name="title" content="Gerenciamento de Usuários">
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
			<?php $this->load->view('dashboard/menu');?>

			<!--LISTAGEM-->
			<div class="block">
				<div class="block_head">
					<div class="bheadl"></div>
					<div class="bheadr"></div>

					<h2>Usuários  do dothnews</h2>
					<form action="cfg_user/listar/" method="get">
						<input type="text" class="text" value="Buscar" name="busca">
						
												
					</form>
					<ul class="insert">     
						<li><a href="cfg_user/inserir">INSERIR</a></li>
					</ul>
				</div>
				
				<div class="block_content">
					
					<div class="breadcrumbArea">
						<p class="breadcrumb nobg">
							<span><strong><?php echo $count_user; ?></strong> Registros</span>
							<a href="cfg_user">Usuários do dothnews</a> &raquo; <strong>Listagem</strong>
						</p>
					</div>
					
					<form class="filter" method="get" action="cfg_user/">
						Filtros
						<select name="id_cfg_grupo">
							<option value="">Status</option>
							<option value="3">Jornalistas</option>
							<option value="4">Colunistas</option>
							<option value="5">Diagramador</option>
							<option value="6">Assinaturas</option>
						</select>
						<select name="libera">
							<option value="">Todos Usuários</option>
							<option value="1">Liberados</option>
							<option value="0">Bloqueados</option>
						</select>
						<input type="submit" class="submit small" value="filtrar">
					</form>

					<table cellpadding="0" cellspacing="0" width="100%">
						
						<thead>
							<tr>
								<th width="1%"></th>
								<th>ID</th>
								<th width="55"></th>
								<th>Nome</th>
								<th>E-mail</th>
								<th>Grupo</th>
								<th class="center">Publica Conteúdo</th>
								<th class="center">Online</th>
								<th class="center">Excluir</th>
							</tr>
						</thead>
						<tbody>
						<?php foreach ($get_all_users as $user): ?>
							<tr id="trID-<?php echo $user->id_cfg_user; ?>" class="libera<?php echo $user->libera; ?>">
								<td>&nbsp;</td>
								<td><?php echo $user->id_cfg_user; ?></td>
								<td>
								<?php if ($user->arquivo == NULL): ?>
									<a href="images/sem-foto.gif"  class="imgMini" rel="facebox">
										<img width="70" height="70" src="images/sem-foto.gif" alt="">
									</a>
								<?php else: ?>
									<a href="http://www.capitaldopantanal.com/upload/cfg_user/<?php echo $user->arquivo;?>" class="imgMini" rel="facebox">
										<div style="background-size: cover;background-image: url('http://www.capitaldopantanal.com/upload/cfg_user/<?php echo $user->arquivo;?>');width: 70px;height: 70px;background-position: center;"></div>
									</a>
								<?php endif; ?>
								</td>
								<td><a href="cfg_user/editar/<?php echo $user->id_cfg_user; ?>"><?php echo $user->nome; ?></a></td>
								<td><?php echo $user->email; ?></td>
								<td><?php echo $user->cfg_grupo; ?></td>
								<td class="center publica_conteudo">
									<input onclick="enumPage(<?php echo $user->id_cfg_user; ?>,<?php echo $user->publica_conteudo; ?>,'publica_conteudo')" id="dcheck-<?php echo $user->id_cfg_user; ?>" name="dcheck-<?php echo $user->id_cfg_user; ?>" type="checkbox" <?php echo ($user->publica_conteudo==1 ? 'checked="checked"' : ''); ?>>
								</td>
								<td class="center libera">
									<input onclick="enumPage(<?php echo $user->id_cfg_user; ?>,<?php echo $user->libera; ?>,'libera')" id="dcheck-544" name="dcheck-<?php echo $user->id_cfg_user; ?>" type="checkbox" <?php echo ($user->libera==1 ? 'checked="checked"' : ''); ?>>
								</td>
								<td class="delete">
									<a href="javascript:void(0);" rel="cfg_user/apagar/<?php echo $user->id_cfg_user; ?>">
										<img src="images/delete.png" width="16" height="16" alt="excluir">
									</a>
								</td>
							</tr>
						<?php endforeach; ?>
						</tbody>
					</table>

					<div id="resultado_cfg_user"></div>
					
					
						<span class="printPage">
							<a href="javascript:window.print();"><img src="images/print.png" alt="Impressão" width="16" height="15"></a> | 
							<select>
								<option value="5">5</option><option value="20" selected="selected">20</option><option value="40">40</option><option value="100">100</option><option value="200">200</option>
							</select> Por página
						</span>
						<div class="pagination right">
							<?php echo $links; ?>
						</div>

								
				</div>
				<!-- .block_content ends -->
				
				<div class="bendl"></div>
				<div class="bendr"></div>
			</div>

			<input type="hidden" class="id_reg" value="">
			<input type="hidden" class="table_name" value="cfg_user">
			<input type="hidden" class="table_sub" value="">
			<input type="hidden" class="table_son" value="">
			<input type="hidden" class="csrf_name" value="<?php echo $this->security->get_csrf_token_name(); ?>">
			<input type="hidden" class="csrf_hash" value="<?php echo $this->security->get_csrf_hash(); ?>">

			<?php $this->load->view('dashboard/footer');?>
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

</body>
</html>