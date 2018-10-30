
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href="<?php echo base_url(); ?>">

	<title>dothNews</title>
	<meta name="title" content="Página Inicial">
	<meta name="description" content="">
	<meta name="keywords" content="">

	<meta name="robots" content="follow,all">
	<meta http-equiv="Content-Language" content="pt-br">
	<meta http-equiv="X-UA-Compatible" content="IE=7">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<link href="images/favicon-dothnews.ico?v=0029" rel="SHORTCUT ICON" type="image/x-icon">
	<!--CSS-->
	<link rel="stylesheet" href="css/style.css?v=0029">
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

			<!-- STATUS DO SERVICO, VEM DO RSS -->
	
			<div class="block small left">
				<div class="block_head">
					<div class="bheadl"></div>
					<div class="bheadr"></div>

					<h2>VISÃO GERAL</h2>
				</div>

				<div class="block_content">
					<p> 

						<b>SUPORTE</b> <br>
						Toda demanda pode ser enviada para <a href="/cdn-cgi/l/email-protection#483b3d38273a3c2d082c273c202b272566262d3c"><span class="__cf_email__" data-cfemail="fb888e8b94898f9ebb9f948f93989496d5959e8f">[email&#160;protected]</span></a> ou através do gerenciador de tarefas da dothcom <a href="http://projetos.dothcom.com.br/" target="_blank">http://projetos.dothcom.com.br/.</a> Essas demandas serão faturadas de acordo com o contrato vigente.	
						
						<br>

						<br>
						<b>REDES SOCIAIS</b> <br>
						Fan Page do Dothnews no 
						<a href="https://www.facebook.com/dothnews/" target="_blank">Facebook</a><br>
						

						Grupo de usuários do dothnews no 
						<a href="https://www.facebook.com/groups/857487947665999/" target="_blank">Facebook</a>
						<br>
						
						Blog do Jornalista:
						<a href="http://www.dothnews.com.br/blog/" target="_blank">http://www.dothnews.com.br/blog/</a><br>	

						<br>
						<b>WIKI DO DOTHNEWS</b> <br>
						
						Wiki com <a href="http://wiki.dothcom.net/index.php/DothNews" target="_blank">Dicas e Tutoriais</a><br>
					

					


						<!--
						O sistema dothNews é dividido basicamente em 4 funções de genciamento: LISTAR, INSERIR, EDITAR e EXCLUIR. 
						O Administrador do Sistema fica a cargo de dar as <a title="Permissões dos Grupos" href="cfg_permissao">permissões</a> para cada grupo de <a title="Usuários do dothnews" href="cfg_user">usuários.</a> <br>
						<br>

						<b>FUNÇÕES DE GERENCIAMENTO</b> <br>
						&bull; LISTAR (Permite ler registros inclusos no site)

						<br>
						&bull; INSERIR (Permite inserir um novo registro no site)


						<br>
						&bull; EDITAR (Permite Editar um registro do site)

						<br>
						&bull; EXCLUIR (Permite a exclusão definitiva do registro da base de dados do site)<br>
						<br>


						<b>SEGURANÇA</b> <br>
						É extremamente recomendado que o usuários troquem regularmente sua senha de acesso ao dothnews.<br>
						Utilize senhas com letras maiúsculas, minúsculas e números. 
						<br>

						<br>
						<b>SUPORTE</b> <br>
						O suporte a todos usuários do dothnews é feito através do gerenciador de tarefas da dothcom <a href="http://projetos.dothcom.com.br/" target="_blank">http://projetos.dothcom.com.br/.</a><br>


						<br>
						<b>NOVIDADES DA PLATAFORMA</b> <br>
						Temos um grupo no facebook exclusivo para usuários do dothnews. Esse grupo foi criado para divulgar recursos, dúvidas e funcionalidades do sistema.
						<br>Faça parte desse grupo. <a href="https://www.facebook.com/groups/857487947665999/" target="_blank">https://www.facebook.com/groups/857487947665999/</a><br>
						<br>
						-->

					</p>
				</div>

				<div class="bendl"></div>
				<div class="bendr"></div>
			</div>


			<div class="block small right">
				<div class="block_head">
					<div class="bheadl"></div>
					<div class="bheadr"></div>

					<h2>Novidades do dothNews</h2>
				</div>

				<div class="block_content" style="height:255px;overflow:auto">
					<p>
						===== 2.0.6 (30.05.2018) ===== <br>
						<br>
						- Integração com API para reproduzir o seu canal do YOUTUBE no seu site<br>
						- Integração com API da Datatix para reprodução de vídeos<br>
						- Suporte robots.txt <br>
						- Ajustes para melhorar performance<br>
						- Sitemaps para qualquer quantidade de notícias<br>
						- Sitemaps para google news<br>
						- Suporte para leitura posterior (Ler notícia depois)<br>
						- Suporte para consultar conteúdo de Fanpage do Facebook<br>
						- Suporte para Adição de legenda e crédito para posts de colunista<br>
						- Suporte a CDN (subdomínio para imagens)<br>
						- Suporte para consultar/embedar vídeos do G1 <br>
						- Suporte a mais formatos de imagens na Edição impressa<br>
						- Suporte a anúncios no meio do texto da notícia<br>
						- Versão Mobile do HelpDesk <br>
						- Correção de Bugs<br>
						<br>
						===== 2.0.5 (28.08.2017) ===== <br>
						<br>
						- Correção de Bugs.<br>
						- Suporte completo para <a href="http://www.dothcom.net/blog/dothnews/projeto-amp-por-uma-navegacao-mais-rapida-em-dispositivos-moveis/" target="_blank">páginas AMP</a> (Necessário Template).<br>
						- Suporte para template personalizado de FEED/RSS<br>
						- Recurso para identificação dos Blocos na capa do site<br>
						- Suporte para imagens das logos das rádios.<br>
						- Suporte HTTPS/SSL em todo o site. <br>
						- Ordenação de imagens da Galeria por nome do arquivo ou ordem (arrastar e soltar)<br>
						- Escolha de imagem de destaque para Galeria<br>
						- Suporte para marcar programas de TV como destaques para aparecer em determinada área do site<br>
						- Suporte para acompanhar o número de impressões dos banners do site no google analytics (Comportamento>Eventos)<br>
						- Suporte para versão impressa do post do colunista.<br>
						- Notificação configurável de administradores do site sobre novos atendimentos por assunto<br>
						- Novo módulo de banner (Instalação sob demanda)<br>
						- Integração com API soundcloud, permitindo montar um player de aúdio no seu site. Muito útil para rádios.<br>
						<br>
						<br>
						===== 2.0.4 (19.12.2016) ===== <br>
						<br>
						- Correção de Bugs.<br>
						- <b>Versão para Smartphone do Painel do DothNews</b><br>
						- [Recurso para Rádios] Gerencimento de Rádios com conteúdos via streaming<br>
						- [Recurso para Rádios] Suporte a tags de audio do soundcloud[[soundcloud:https://soundcloud.com/youngma/young-ma-ooouuu-1]]. Tem que ser configurado no template do jornal para aceitar esse recurso<br>
						- Sistema de Ranking. Exs. Top 10 rádios mais ouvidas <br>
						- Novo Recurso de mapa de bloco dos banners. <br>
						- Integração com API ISSUU. Método para pegar a última edição publicada na ISSUU.<br>
						- Suporte a cortesias para clientes em assinaturas de jornais e revistas.<br>
						- Opção para notificar via e-mail um colaborador sobre determinado atendimento/helpdesk no site.<br>
						<br>
						<br>
						===== 2.0.3 (08.02.2016) ===== <br>
						<br>
						- Correção de Bugs.<br>
						- Opção para URL fixa de notícia. Útil para hotsites e notícias externas<br>
						- Ferramenta de Corte de Imagens. Corte e posicione com maior precisão as fotos de capa do seu site.<br>
						<br>
						<br>
						===== 2.0.2 (11.11.2015) ===== <br>
						<br>
						- Correção de Bugs.<br>
						- Novos métodos de pagamento no módulo de captação de assinaturas (PayPal, Boleto e Pagseguro)<br>
						- Suporte a previsão do Tempo com dados do www.cptec.inpe.br<br>
						- Contador de caracteres nos campos de títulos nas notícias no painel<br>
						- Suporte a Clicktags e pixel de impressão no sistema de banners padrão do dothnews<br>
						- Opção para liberar comentários nas enquetes<br>
						- Opção de imagem para cada resposta da enquete<br>
						- Botão Rápido para inserção de notícias no painel
						<br><br>
						<i>Algumas funcionalidades dependem de alterações em seu templae e/ou configurações do dothnews para pleno funcionamento.</i>
					</p>
				</div>

				<div class="bendl"></div>
				<div class="bendr"></div>
			</div>

			<input type="hidden" class="id_reg" value="">
			<input type="hidden" class="table_name" value="">
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
	<script type="text/javascript" src="js/ajaxupload.js?v=0029"></script>
	<script type="text/javascript" src="js/jquery.pngfix.js"></script>
	<script type="text/javascript" src="js/meus-metodos.js"></script>
	<script type="text/javascript" src="js/jquery.metadata.js"></script>
	<script type="text/javascript" src="js/jquery.tablednd.0.7.min.js"></script>
	<script type="text/javascript" src="js/fileuploader/fileuploader.js?v=0029"></script>
	<script type="text/javascript" src="js/jquery.maskMoney.js"></script>
	<script type="text/javascript" src="js/jquery.maskedinput-1.3.min.js"></script>
	<script type="text/javascript" src="js/shadowbox-3.0.3/shadowbox.js"></script>
	<script type="text/javascript" src="js/ckeditor/ckeditor.js?v=0029"></script>
	<script type="text/javascript" src="js/ckeditor/adapters/jquery.js"></script>
	<script type="text/javascript" src="js/colorpicker.js"></script>
	<script type="text/javascript" src="js/jquery.word-and-character-counter.min.js"></script>
	<script type="text/javascript" src="js/strength-pass/strength.js"></script>

	<script type="text/javascript" src="js/jquery.autocomplete.min.js"></script>

	<script type="text/javascript" src="js/sgi.js?v=0029"></script>
	<script type="text/javascript" src="js/custom.js?v=0029"></script>

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