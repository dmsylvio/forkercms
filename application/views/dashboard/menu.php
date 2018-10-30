<div id="header">
	<div class="hdrl"></div>
	<div class="hdrr"></div>
	<a href="javascript:void(0);" class="menuMobile" onclick="$('.navegationArea').toggleClass('active'), $(this).toggleClass('active')">
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 3 18 18">
			<path d="M3,18h18v-2H3V18z M3,13h18v-2H3V13z M3,6v2h18V6H3z"/>
		</svg>
	</a>
	<h1 style="margin-right:0px;"><a class="logo" href="<?php echo base_url(); ?>">dothNews</a>
		<a href="dn_noticia/inserir" title="Nova Notícia" class="shortcut first" style="margin-right:20px;">
			<img src="images/ico-add.gif" width="17" height="15">
		</a>
	</h1>
	<div class="navegationArea">
	<ul id="nav">
		<!--<li class="active"><a href="inicio">Dashboard</a></li>-->				
		<li>
			<a href="javascript:void(0);">Conteúdo</a>
			<ul>
				<li>
					<a href="javascript:void(0);">Colunistas<span>&rsaquo;</span></a>
					<ul>
						<li><a href="dn_coluna">Coluna</a></li>
						<li><a href="dn_coluna_categoria">Categorias</a></li>
						<li><a href="dn_coluna_post">Posts</a></li>
					</ul>
				</li>
				<li><a href="dn_noticia/inserir">Notícias</a></li>	
			</ul>
		</li>							
		<li>
			<a href="javascript:void(0);">Publicidade</a>
			<ul>	
				<li><a href="dn_banner">Banners</a></li>
			</ul>
		</li>					
		<li>
			<a href="javascript:void(0);">Relatórios</a>
			<ul>
				<li><a href="cfg_log">Acessos</a></li>	
			</ul>
		</li>					
		<li>
			<a href="javascript:void(0);">Configurações</a>
			<ul>
				<li>
					<a href="javascript:void(0);">Eleições<span>&rsaquo;</span></a>
					<ul>
						<li><a href="candidato_foto/">Candidatos</a></li>
					</ul>
				</li>
				<li><a href="cfg_user">Usuários  do dothnews</a></li>
				<li><a href="cfg_permissao">Permissões</a></li>
				<li><a href="dn_canal">Canal</a></li>
				<li><a href="dn_editoria">Editoria</a></li>
				<li><a href="adstxt">Ads.txt</a></li>	
			</ul>
		</li>	
	</ul>
	<p class="user">Olá, <a href="perfil"><?php echo ucfirst($_SESSION['nome']) ?></a> | <a href="cfg_user/logout">Logout</a></p>
	</div>
</div>