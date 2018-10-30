/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

// Para configuração remota adiciona sufixo a arquivo (popup de imagens)
var sufixo_arquivo = UPLOAD_REMOTE_ENABLED=='1' ? '_sgi' : '';

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration for ckeditor

	var toolbar_sgi = [
		{ name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
		{ name: 'colors', items : [ 'TextColor','BGColor' ] },
		{ name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','Source' ] },
		'/',
		{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
		{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] },
		'/',
		{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
		{ name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
		{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
		{ name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','SpecialChar','Iframe' ] }
	];

	// configuracoes principais
	config.toolbar = toolbar_sgi;
	config.width = '720px';
	config.height="500";
	config.uiColor = '#FFFFFF';
	config.timestamp = null;

	// idioma e corretor ortografico
	config.defaultLanguage = 'pt-br';
	config.language = 'pt-br';
	config.scayt_sLang = 'pt_BR';
	config.scayt_autoStartup = true;

	// upload
	config.filebrowserBrowseUrl = SGI_URL+'js/ckeditor/plugins/kcfinder-2.51/browse'+sufixo_arquivo+'.php?type=files';
	config.filebrowserImageBrowseUrl = SGI_URL+'js/ckeditor/plugins/kcfinder-2.51/browse'+sufixo_arquivo+'.php?type=images';
	config.filebrowserFlashBrowseUrl = SGI_URL+'js/ckeditor/plugins/kcfinder-2.51/browse'+sufixo_arquivo+'.php?type=flash';

	/*
	config.filebrowserUploadUrl = SGI_URL+'js/ckeditor/plugins/kcfinder-2.51/upload.php?type=files';
	config.filebrowserImageUploadUrl = SGI_URL+'js/ckeditor/plugins/kcfinder-2.51/upload.php?type=images';
	config.filebrowserFlashUploadUrl = SGI_URL+'js/ckeditor/plugins/kcfinder-2.51/upload.php?type=flash';
	*/

	config.filebrowserUploadUrl = SGI_URL+'ckeditor/upload/?type=files';
	config.filebrowserImageUploadUrl = SGI_URL+'ckeditor/upload/?type=images';
	config.filebrowserFlashUploadUrl = SGI_URL+'ckeditor/upload/?type=flash';
};