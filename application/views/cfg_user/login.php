
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>SGI • Login</title>
	<base href="<?php echo base_url('dothnews'); ?>">
	<meta name="robots" content="noindex, nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<link href="css/style.css" rel="stylesheet" type="text/css">
	<link href="css/jquery.wysiwyg.css" rel="stylesheet" type="text/css">
	<link href="css/facebox.css" rel="stylesheet" type="text/css">
	<link href="css/visualize.css" rel="stylesheet" type="text/css">
	<link href="css/date_input.css" rel="stylesheet" type="text/css">

	<link href="images/favicon-dothnews.ico" rel="SHORTCUT ICON" type="image/x-icon">
	<!--[if lt IE 8]><style type="text/css" media="all">@import url("css/ie.css");</style><![endif]-->
</head>

<body>
	<div id="hld">
		<div class="wrapper">
			<!-- wrapper begins -->
			<div class="block small centro login">
				<div class="block_head">
					<div class="bheadl"></div>
					<div class="bheadr"></div>

					<h2>Login</h2>
					<ul>
						<li><a href="../">voltar para o site</a></li>
					</ul>
				</div>
				<!-- .block_head ends -->
				<div class="block_content">

					<div id="retornoLogin">
						<?php $error = $this->session->flashdata('error'); ?>
						<?php if (isset($error)): ?>
							<div class="message errormsg">
								<p><?php echo $error; ?></p>
							</div>
						<?php endif; ?>
					</div>
					<?php echo form_open('', array('class' => 'loginSenha')); ?>
					<form id="formLogin" action="inicio" method="post" class="loginSenha">
						<p>
                            <?php $error = form_error('email', '<div id="retornoLogin"><p>', '</p></div>'); ?>
							<label for="log_email">Usuário:</label> <br>
							<input type="text" class="text" placeholder="e-mail" name="email" value="<?php echo set_value('email'); ?>" id="log_email">
							<?php echo $error; ?>
						</p>
						<p>
                            <?php $error = form_error('senha', '<div id="retornoLogin"><p>', '</p></div>'); ?>
							<label for="log_senha">Senha:</label> <br>
							<input type="password" class="text" placeholder="senha" name="senha" value="<?php echo set_value('senha'); ?>" id="log_senha">
							<?php echo $error; ?>
						</p>
						<p>
							<a href="javascript:void(0);" class="lembrar_senha">Esqueci minha senha</a>
							<input type="submit" class="submit" value="Login"> &nbsp; 
							<input type="checkbox" class="checkbox" id="rememberme" value="1" name="manter_conectado" checked="checked"> <label for="rememberme">Manter Conectado</label>
						</p>
					<?php echo form_close(); ?>

					<?php echo form_open('auth/remember', array('class' => 'loginSenha none')); ?>
						<p>
							<label for="lembar_email" class="lb_lembrar">Para recuperar a senha informe seu e-mail e clique em enviar:</label><br>
							<input type="text" class="text" placeholder="e-mail" name="email" id="lembar_email">
						</p>
						<p>
							<a href="javascript:void(0);" class="lembrar_senha">Cancelar</a>
							<input type="submit" class="submit" value="Enviar"> &nbsp; 
						</p>
					<?php echo form_close(); ?>

					
				</div>
				<!-- .block_content ends -->

				<div class="bendl"></div>
				<div class="bendr"></div>
			</div>
		</div>
		<!-- wrapper ends -->
	</div>
	<!-- #hld ends -->

	<!--[if IE]><script type="text/javascript" src="js/excanvas.js"></script><![endif]-->	
	<script type="text/javascript" src="js/jquery.js"></script>

	<script type="text/javascript" src="js/jquery.img.preload.js"></script>
	<script type="text/javascript" src="js/jquery.filestyle.mini.js"></script>
	<script type="text/javascript" src="js/jquery.wysiwyg.js"></script>
	<script type="text/javascript" src="js/jquery.date_input.pack.js"></script>
	<script type="text/javascript" src="js/facebox.js"></script>
	<script type="text/javascript" src="js/jquery.visualize.js"></script>
	<script type="text/javascript" src="js/jquery.visualize.tooltip.js"></script>
	<script type="text/javascript" src="js/jquery.select_skin.js"></script>
	<script type="text/javascript" src="js/jquery.tablesorter.min.js"></script>
	<script type="text/javascript" src="js/ajaxupload.js"></script>
	<script type="text/javascript" src="js/jquery.pngfix.js"></script>
	<script type="text/javascript" src="js/custom.js"></script>
	<script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>

	<script type="text/javascript">
		$(document).ready(function(){
			$('form.loginSenha .lembrar_senha').click(function(){
				$('form.loginSenha').toggleClass('none');
				$('#retornoLogin').html('');
			});

			$("#formLembrarSenha").validate({
				errorPlacement:function(error, element){
					$('#retornoLogin').html('<div class="message errormsg"><p></p></div>');
					$('#retornoLogin div.message p').append(error);
				},
				errorClass: "wrong",
				rules: {
					email: {required: true, email:true}
				},
				messages: {
					email: {required: 'Informe o e-mail', email:'E-mail inválido'}
				},
				submitHandler: function(form){
					$('#retornoLogin').html('<div class="message info"><p>Aguarde, processando...</p> <span class="close" title="Dismiss"></span></div>');

					// ENVIA O FORMULARIO
					$.post('cfg_user/enviar_link_senha/', $(form).serializeArray(), function(data){
						if(data.rs=='ok'){
							$('#retornoLogin').html('<div class="message success"><p>'+data.msg+'</p></div>');
						}

						if(data.rs=='erro' || data.rs=='nao_encontrado'){
							$('#retornoLogin').html('<div class="message errormsg"><p>'+data.msg+'</p></div>');
						}
					}, "json");
					return false;
				}
			});

			$("#formLogin").validate({
				errorPlacement:function(error, element){
					$('#retornoLogin').html('<div class="message errormsg"><p></p></div>');
					$('#retornoLogin div.message p').append(error);
				},
				errorClass: "wrong",
				rules: {
					email: {required: true, email:true},
					senha: {required: true}
				},
				messages: {
					email: {required: 'Informe o e-mail', email:'E-mail inválido'},
					senha: {required: 'Informe a senha'}
				},
				submitHandler: function(form){
					$('#retornoLogin').html('<div class="message info"><p>Aguarde, processando...</p> <span class="close" title="Dismiss"></span></div>');

					// ENVIA O FORMULARIO
					$.post('cfg_user/logar/', $(form).serializeArray(), function(data){
						if(data.rs=='ok'){
							$('#retornoLogin').html('<div class="message success"><p>Redirecionando...</p></div>');
							window.location = data.url;
						}else{
							var msg = data.msg!=undefined ? data.msg : 'Login e/ou senha inválidos';
							$('#retornoLogin').html('<div class="message errormsg"><p>'+msg+'</p></div>');
						}
					}, "json");
					return false;
				}
			});
		});
	</script>
</body>
</html>