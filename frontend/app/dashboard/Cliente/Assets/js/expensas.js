// JavaScript para la funcionalidad de la secciÃ³n de expensas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeExpensas();
    setupEventListeners();
    updateDaysRemaining();
});

// FunciÃ³n para inicializar la secciÃ³n de expensas
function initializeExpensas() {
    // Agregar animaciones de fade-in a los elementos
    const elements = document.querySelectorAll('.expensa-item, .resumen-card');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
    
    // Configurar tooltips
    setupTooltips();
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    const filtroButtons = document.querySelectorAll('.btn-filtrar, .btn-limpiar');
    filtroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-filtrar')) {
                aplicarFiltros();
            } else {
                limpiarFiltros();
            }
        });
    });
    
    // Detectar cambios en los selects de filtros
    const filtroSelects = document.querySelectorAll('.filtro-select');
    filtroSelects.forEach(select => {
        select.addEventListener('change', aplicarFiltros);
    });
    
    // Botones de detalles
    const detalleButtons = document.querySelectorAll('.btn-detalle');
    detalleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleDetalles(this);
        });
    });
    
    // Botones de descarga
    const downloadButtons = document.querySelectorAll('.btn-descargar');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            descargarPDF(this);
        });
    });
    
    // Botones de comprobante
    const comprobanteButtons = document.querySelectorAll('.btn-comprobante-item');
    comprobanteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarComprobante(this);
        });
    });
}

// FunciÃ³n para mostrar/ocultar detalles de una expensa
function toggleDetalles(button) {
    const expensaItem = button.closest('.expensa-item');
    const detalles = expensaItem.querySelector('.expensa-detalles');
    
    if (expensaItem.classList.contains('expanded')) {
        // Colapsar
        expensaItem.classList.remove('expanded');
        detalles.style.display = 'none';
        button.textContent = 'Ver Detalles';
        
        // AnimaciÃ³n de colapso
        detalles.style.maxHeight = '0';
        detalles.style.opacity = '0';
        
        setTimeout(() => {
            if (!expensaItem.classList.contains('expanded')) {
                detalles.style.display = 'none';
            }
        }, 300);
    } else {
        // Expandir
        expensaItem.classList.add('expanded');
        detalles.style.display = 'block';
        button.textContent = 'Ocultar Detalles';
        
        // AnimaciÃ³n de expansiÃ³n
        setTimeout(() => {
            detalles.style.maxHeight = 'none';
            detalles.style.opacity = '1';
        }, 10);
    }
}

// FunciÃ³n para aplicar filtros
function aplicarFiltros() {
    const anoSelect = document.getElementById('ano-select');
    const estadoSelect = document.getElementById('estado-select');
    
    const anoSeleccionado = anoSelect.value;
    const estadoSeleccionado = estadoSelect.value;
    
    const expensaItems = document.querySelectorAll('.expensa-item');
    
    // Mostrar loading
    mostrarLoading();
    
    setTimeout(() => {
        expensaItems.forEach(item => {
            let mostrar = true;
            
            // Filtrar por aÃ±o (simulado - en una app real se obtendrÃ­a del data attribute o similar)
            if (anoSeleccionado !== '2025') {
                // Simulamos que solo tenemos datos de 2025
                mostrar = false;
            }
            
            // Filtrar por estado
            if (estadoSeleccionado !== 'todas') {
                const tieneClase = item.classList.contains(estadoSeleccionado.slice(0, -1)); // Remove 's' from plural
                if (estadoSeleccionado === 'pendientes' && !item.classList.contains('pendiente')) {
                    mostrar = false;
                } else if (estadoSeleccionado === 'pagadas' && !item.classList.contains('pagada')) {
                    mostrar = false;
                } else if (estadoSeleccionado === 'vencidas' && !item.classList.contains('vencida')) {
                    mostrar = false;
                }
            }
            
            // Aplicar filtro con animaciÃ³n
            if (mostrar) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
        
        ocultarLoading();
        mostrarResultadosFiltros();
    }, 500);
}

// FunciÃ³n para limpiar filtros
function limpiarFiltros() {
    const anoSelect = document.getElementById('ano-select');
    const estadoSelect = document.getElementById('estado-select');
    
    anoSelect.value = '2025';
    estadoSelect.value = 'todas';
    
    const expensaItems = document.querySelectorAll('.expensa-item');
    expensaItems.forEach(item => {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease-in';
    });
    
    // Mostrar mensaje de filtros limpiados
    mostrarNotificacion('Filtros eliminados', 'success');
}

// FunciÃ³n para mostrar loading
function mostrarLoading() {
    const listaExpensas = document.querySelector('.expensas-lista');
    const loadingHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <span>Aplicando filtros...</span>
        </div>
    `;
    
    // Crear elemento temporal de loading
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = loadingHTML;
    loadingElement.classList.add('loading-overlay');
    listaExpensas.appendChild(loadingElement);
}

// FunciÃ³n para ocultar loading
function ocultarLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// FunciÃ³n para mostrar resultados de filtros
function mostrarResultadosFiltros() {
    const expensaItems = document.querySelectorAll('.expensa-item');
    const itemsVisibles = Array.from(expensaItems).filter(item => 
        item.style.display !== 'none'
    ).length;
    
    mostrarNotificacion(`Se encontraron ${itemsVisibles} expensas`, 'info');
}

// FunciÃ³n para actualizar dÃ­as restantes
function updateDaysRemaining() {
    const diasRestantesElements = document.querySelectorAll('.dias-restantes');
    
    diasRestantesElements.forEach(element => {
        const fechaVencimiento = new Date('2025-07-10'); // Ejemplo
        const hoy = new Date();
        const diferenciaDias = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
        
        if (diferenciaDias > 0) {
            element.textContent = `${diferenciaDias} dÃ­as`;
            element.style.color = diferenciaDias <= 5 ? '#ff4444' : '#ffaa00';
        } else if (diferenciaDias === 0) {
            element.textContent = 'Vence hoy';
            element.style.color = '#ff4444';
        } else {
            element.textContent = `Vencida hace ${Math.abs(diferenciaDias)} dÃ­as`;
            element.style.color = '#ff4444';
            
            // Agregar indicador de vencimiento
            const expensaItem = element.closest('.expensa-item');
            if (expensaItem) {
                expensaItem.classList.add('vencida');
                expensaItem.classList.remove('pendiente');
            }
        }
    });
}

// FunciÃ³n para dÏ¤f€0‚ÊwÀ‡d`j$˜šÈ7
„5¦ Êåmò,å4DÏß8ãÞÀ)ß(˜×píŠ"#Ð¬ùŽ¹°V×žÚÈÿüc‡ü‘îµ˜QQ˜ÄÅ<ŸŒ²kc‚ÆjÕÄÞIH‹L CKjÍÀ±I6?U…0m±BÞÜt÷1$&$Ê˜Ÿ­±ÊñªD"©š;¶£Õ ÕÓè[päöÄ^¼ñ“á6HÆÏ†^pg$	5%	P´L–%–xšôŠ7qŸ¸Œ[ ½10Éí×K‡ÜFÝ‰ÆA$ÚGûÒ&ú¯H$âóLýf+¶:(/¨þªÉ%1rAÍÀåÀª	¸Ø@T3pF0ÁŠ ~¹\fœ¹H=”0jj{%‡5v>œQg wš%Ë úÃ…A!‚±±ù5Ù/ÜÀE£­ñ,v |ßŠFâ!ë6Ëâ†h4Pªi¨‡ªŒ®
¸`¾|‡‚æ#Ðˆ¨ªçžØ#ãç¾Û×€÷ q ¯‡¤d–cß¼J§ƒsª1-	—"¥Ä®è¨Ý‡k\IB[\ "¹Zâ0ub~ÓU ú£ººšP­« fÕ¸¡MÀeSáœÅ"qŸ´zÉ-»\]µ.\8&­Qmb,uÔX³ |ŸÜÂÂr0]«‚%ì´ÊK­Ÿ«A*¡ÅMñÔG2íÿ
h»[¦±UD#ØhÃ%I“¯Põ®q7í‘‡I†G—_HÆ—8#F×È,Ë®(‡+?Œá}&¢QòRd¢‚®9çÐêE#…T0mèþÞða0’/pÓÿÕ‘vôJHÜ^e†ˆ=”Â Ïké”Ø³œ¼ÁJ/O3õ¤ø–BºE–s^Ä[Äíß@æO±Î†–ñ{fXO‰eYW#a´2/íí½µpjwè—‘žîÎWÑ@€¸½tgx‡Ó)³'Îã©ÅÐ4Õ(æ:åxä]Ú³ˆ¶DJ±Ö§ŽšO›^‘ô°a®¦Rš@Sxá5pš:ÓÕ.5|
5ú*x‰¹7ÖÀm?@‰K>cßåmha¯GØà§ˆg"±„lù>Šy)Â(Ù¶¤ºkl°+Ax…äW+<sÙ€t5¯y¦U×œ»fp¡ŒƒF€mð"¢NpcG-l%_/ÀÈ‘&ùG
ÃÍÓG	-‹Òá4‚&µZ†G¶Ì‹Ô4úÔŽdUS i!P¶b% ˆ)‰ÚbÉ€é?Û• Ú ™ZÿÜ‰ª_™oQpµfš“”RóÔÏ§ïÀBª<õ¿…ë/kYhö/¢5@>µÊ–ØªÁ¶Àv@i‰1]"ÄíùÂãnÙyè–¹AÛ¹6˜‡¡˜³SGpµñ/ Éñ+p%µäú‘Èvå¢4ºNA¾»×gù‘l-õ¦“]€€êÑ$ï
(H(A>˜·ÐX’½Ô ˆ…Žª °×WƒÚ²¢ö„£ÔÊÂ	ªâ,v®ÊK–FÜ#O`µÔ2æ——«eèÒ%D² O“É±6ÈWJæe ¦"þ†´ SÑQJ~X¤D\bÅXÒS.1'R?Ç\Êv¤|Ê¸×š@Ñ9œ²­ JËg‰§lƒC`ACƒ›°áÛ…ð1]nÅ$zdÃÛZ…ß€T·¸äU›,Ë¦Ö9=ALIU	ãò±P^fS×ð³ÐîWb¦|€°@ùlÍ`LË2fL©|êXÍrãmb±ksàXÛªŸÑ[’ª{%s5mAA¸¶xf}v¥A˜cï•v%ì-·÷¾Û#Tò-N·Xuö{cJ®	2ÃÖJ¸J‹Uöì5Ä6FtáÜVîÀKàh­G¬We U#ß(ìÎ˜O˜_øøÐ*ã1ÒÚ1À® ƒ›­Îw7V%«[J$L<Še]ª¼¶fÀ#á¢¡É5 ù}u¤8wÝ5Ã^QÜ:’5[‰1pvÀáº9KÑ†k±PíAu¥í«©*êù.ÌîgÞ¸(d{cú(À¹¢ºêþùXVÔŽèï>öÔ.ˆõt>oãŽã±»z%„¡· ¨5W·€ºMÐ‰ŠÁ»´}*+&ë(Å1L=¤‘°¬$,SÓàÔg@½ñà[Ã+€e1:l²Š*QUp5¼|„€ç}§¬ax-ËJNá@kè@bXÙd¦Äw„Id+”/VDÿ¼€ª387Ü‹5ö²òzê5 š8Y–”b¹LÙñ3C—w°`[_ÚîfÑEÇlûª ‹ÜFBå_DLc „™ü°¨To™7¦1rø$×ý2½l2\Ž‡S½añIHI7
Pè¾½ 2A*¶<ÞŠñàÉTñ8Ø<%¬gEÝØRA`¨œÀÖŠÎcx&>P#Æc;âWœ³ªm«ã:"*<ÇSÄðFèeoŸ#®p5¹a³_lŠ•†1p)¨ø]aÕ‡Þ-«Ëê¬ÓY›Ø?L±_im¨è•Bq1<kXM¬ÐÅk.8*ZM;R«„@zquä%jb,Ñ	¯ÜžŒ+$¦b_Ô–¯¥]Ê‚¦RkÞ2‡äÃ(nöØÄLp5äë´Zùv„Y¢v$P˜ò& çÝ»v¥&ß“¡9¨%€0 xÍà-„¯¦Š©`¦{<ô»’Ù˜[5QB‚À,Éx”åó0"â(®‘(—UF°èh3ß%¬9rÏG+¤-(õ&š&ðÚ2ß³B—9Zž~
’¹SlZ*8qûÙ©åRüeM?¿ßï½åïšçÆã›"í–m_ÐŒ= 	F-XÁô‘À0~PÚƒðŸÆ-MT÷ŸÓ`Vš+
åJ+ÚFLpåÍ£”I¯Ù´˜²veÏ”1fbTsáÏDé–8F|Î©©ØœÅu~¡™Þ­a16ÆÄDÜˆ<®¿Ö:‹æ‡D‡# ¼ñ£0´U‹@XiS ’u3ÁQ2††+oËè)ôŸtÍD@– ÌÈl´Âñˆ©ŠE´ðÇ+!û[a†3‹)d»Ÿ{Œ¦&sé(ŽÀUéb¦xªcððàÁAÒ§F°zI:™bm?§Llé™)å¯2å•é5û %Ÿ¤¬à2—+–m*WÚ˜qýØ´‘†£+DG@˜8é`¦D@€Ê‰°šC»CJHèAÐü Wfv²ÏØ:Æ‚iy@ëH¾w0p§;Ù\8sB}~.ÛrÇ(ö8ÝÒO—L;É'x‡Gùù3¨Ú(É k}dœ€®š+&“Ê»¢ÿ(3Ð¹ñ7XËDô>ßBwÖþ³õ¡tÑN¸ôYbT|pD\ÒšÃ4ðBçjU°M´Àf$¨šÊFÍºK÷”º‡ñL·)wÏ|Vç9„[üËl§ß9ÛåÀKÂ™Í…1÷úÝb9}ÞŸóçVˆËç~À¥‚WÊ\…q¦§Ã\ßÏ3÷¬ó#\Ú™XYéˆ¥ ÛÚCÚÆMöDc/ÔUT›çòâX¹2Œëì8-ë§x$Ë°÷s]†¶	–u"žà( Ê‹ˆ«?¹-ð&»ÑI8ÙŠ™
«@šÕŠýÁ.0¨BoàvðŒ+=Çu$ôLW®Öþ‘µBüËq–ï¢ö{Ëï‡åPÆêí¨âæîõˆœ®Ï¶À…Ÿ@JëBýZ§‡ôdtº½tsåëÕ4#:YHCûUwºFÈýï™Ðì3TÁý÷¨ó^x×ÒŽB3“8Àýý†×u­b”.(êsnÂ¹mL¡ã¨+:×í¥ñPO±ÌL¶SàñFÔL=¯„“Ò­T‡½Jµú9p(Í##]uÿ‘0¶å'š,ß7wöžr˜ŸXoz½ÕJÏ"mO^7µ¡g'êÿìZ`ù#çœëwšûÎÕZ7 â&Óï{,¯^<	,2G©EV¶PÄþC÷E\ð}pÉ· W—ÂµÄ±˜Ì/ý	ö÷øy“ñß¡Ž{œ±B>®Õ¼J~ùÇ‰}|—rµþÑˆÄ¿F.Ò.²ðÄB‘%ª}JØ§D¢ÉÐ•"ðQø]©6ÕÈ)­¬€túuÂ‰“y±ž×Ó(ðöØç_¬E¡áÍßC˜ÿ,®|ì”k¥ë^¯¶Vf:â+ðï•žl#ZA¬j™ï¯[f.ÿæ°8±ÔZö5yû6§¿g}vÏF`1ÎXå~D+4Ë;«~z
t Ð“—‘ñ{õ» j°´Ï­ÖªºQ—ÏàZ„ZT“x@BO—g<%©K«O‹êÝ`7ÖíÆò!FMù[µ‰‡¦ˆIêo{Î§n£á’xVgàMôO¸<Ø)jR#DÊ³ '†?d÷«ý2t“îüõ6ùÿÉ€¬(Žï3àÍcµŒ=Ô(M„$V#Í	wW'Jä¢Õ¬rµÁ}
p›w‹BµÌâoo C .¯²l6NºÃ­Ó«W™ÈÿÉpd(½BÑr7-Ê!1x˜\úàâmÄål©ÄÂt‰¬çZBÈÄ’UâÀY¼dp	Ð±).Dƒ­Ì…s£@¤÷]ç!¡¢§Û©ä¶§Œu‰\TXQå^¯oË¿U7Ž¦òI}6:é;'{0Ô33=]Œw¾ÅìæU¸xaƒdKË€ýl«¼sîÎ›Q‹ã¢‹Ú>!3ø'$ëÙÿAàŸ£:±˜:Îõ-Í–0"û?Õì©VB:ž¥ÜÒ¯nË…&QG”}gëÈ	G8¹æ–bz† ¦æPlµÏ 99uV–…Ú•.ƒ)ès nâ+aæÓ
xÆRìäœhÄ;9ß\7ªíO½”ÜÙQqíÓ‚RÁ÷²=3yAÛÝ½ ¡tö;‘˜ÂM•ŠÈw„WX¥pr:rÆàåˆw¸—O¿Ag¸Û…Þ¡Mì“°ñ?£Òên¥wV÷œÒòÃè˜‚|™R=™¥è{ŒS9ßTy•«8Oç>7ÝÚBC6sèzèã !™ŽÞÖ-®“ë2+‚´+*¤T¡wÑn¡ìqâÈþ+Y­MP@¯úøq¯ÊÕ/´®ˆú!a5ÕŠ{oåH­MËrë_sÁ’û…þ'Äð;ßòÐ³%«À¡Õ3!»eoÒ„3S‚á^PúqÀÀîú	“/ìCB¾€ÊBrÖ,¶§ó ¯ãê	
²$ag _ö3ƒá1¨žÈàçÒ4/þüœ²Ù3ù&H	ª”nE²½ï@D™ç™`h
ÍðŠÇ‰Yøž!¸ÅéÔÍ¶‡qÜÙ7Ø‹'ÔxñøE7Xó&úgƒ‘3!(ù¸rÈ_rJ»s$árn]‰Ù
2KþÒã@$Ò(æ3d·äcXÞ¿Ðg¬óšt@k}tëxOQ|’—,¯ogïjÐsÆ)µUYúÅ€Ýª*ÑšðþÐhºó q@×Jî®C"Mñr¥SO€%1ní‹ðíÚ³KÚq8°žÝ€¹Ä}šdÅ¥ÛÆ¦÷—”?Ð7ï†É¼!œÃ+??£m VëMPeÜ¯©/¸¿šýžrqŒgõºˆ®umá*ig{€—Ž¤zRYê C0ï`ºØ”ú'6<}¢\ÚÄw­c<Cƒ¢sEœu†Ò€6,¦DqÙîm‡ÈÆ¬ý³I<À2;	_'ËèŽ'8càuÞj9ß"‘,`•ãá>¤éÐ,4™ü7eéëÀÈüq}”ºÑÕÊûÞ^²'ž¿G¢$ÉßþÌ&4šW,5ÍõÆAâÏ:w>Ò;ŽÍó°ÛOK+^™8ˆbw,7Pe„iI·=ýî¯‹{jq`ˆe3+H¥y,Ð'\ž¿ÝÑ¨Ï	Ùnÿ,<Òy=ÈÊ-Ö\Y}÷XåöÈQ®Â	)=LkÉ<DègCxØ­gf:ˆšPÙ‘‹E}éƒN4†'*±—ýì+D¥}àâpc/+Œ3ÍòÅxVœ§Ö½ØÍÓ6zPÝ¦w¥ÝïœÁíäÇó®æà#.¦–K=Áñˆ_ñ§wÃ
¹3c\Î¢çã^ºâÚeFŸ|ÐŒìÃE0`WQö­ÿâ"†q'Þhü9ÐÆµæÐ$¤§åv­	|ãÕxQâØ¸C	7àªÀù(‚{o‚wT(¾ÒG÷#¤™‘|`ûœ•a¯¸î¬ƒëbbæ9gìÁê´ŽÜ%Ñ.6¢2‰‚$Êé}â@ªdÀHmªÌk¯÷ø˜áÛnÇNž°&ëÉäñ‰¼I²õ[¤<,¤m—¡ý-0Fœ±Ü›~.§‡·4} SÉ{h¨s&’ˆ×›CÄÎó-ž,Céìè¡jç;’ÈL²KýBÌ’‹!eóæƒ¶ØÉ ué¢ËB,w¨`¤êjhùƒiþI9¤*¶2é_Aƒ­ ;./@f§z¿Kª0·¿·»Ã»“WÊu¿ÂuíLSYŠJ©ëçÁ€èÈÉ€Ýâ–è™Î'.é‘üØzN)G"\ÑIÕˆì€`Li›z¢QºôæqÄ@¡à	_&½ûÆÑSN÷’Ãž|-Àg Ú@JV?èÇPØžwäÏJ2ßQ…{²ƒö„J+í€Î‰lñf%q˜„Áž€làŸ@W“P-wûm7h8ÿ®™¶òÃÓ:Ïn÷õ±­5X{¾©)Öú¤Ýüø qg
1.ß°è~%à¹ÏS``u¹áßàKiü]¢íc1ÉàOu@˜G1v3˜(Ÿ(%N Üî|˜Ä™ÍØÃÀý'ÞõM&±[ùtlqVt$=bdÛ©Ð”Ï•h4ŠÙÙM ×hH¿èò•YÅ;W¦w¬W¾.ù8íÜï}Y­êíqAÎO};Þ­xA…ÕâNÊÅéCµ:öÂ/æd_!Bèßÿ­ãJý@koJw}S×½ícá–-}‚œø1•”á#u;è(e}·upR‰À’ZRªsc}}à[n¡	ìFÐ‘8bÜ°7Ìç6v\83¹Â¦±@ï‚4«I¡äºi°šv§T;•d)sùš*¼ð¬ º€ô~Þõþžq.ƒÏ 6Êœg°xðßÃMè]o'?Žq3™L·@‚@ÎÆxß¯÷/º‰“6C3×¹çÔ\Ù?.ð)[eäkñ%O“}¦ƒ$Ýœç?ürAï(Bœ\t)H4p?s¨¹Ò)ˆ»e¨°7‘è*n}ƒÙ5•h=¤LóhäºhJ±ð)›Ç&,c“§»”ûã9^ÎÝÃ”êÀCŠÚŸjcZz™:¨‹Ûò5X7fÄ÷h}ÐÙò¹'0½×N!uÑó§Ìá&3™µÀPf{³c¹wÛ±^Ôž~ƒ£#‹rR¶4Ø:ØòÙ$0/®õÚª¯TòªXî•Æ}Äx¡•î þë>O;ÔNß¦¾”ùÖÃ>õ!âÛ¶=|³G¨³¸-´4*qÉtñ•¡”YaÝŒÏ!øœÚfLg"*ÚôµœŸàDM×ó_~NDÂt©ÃÝÌ‰vzá#ÂŒô¨òX	‚\ÇKI½Ã[Õ3N°óHð47æÕx4¸­xÖµŠ’ò3ä•!žŸ«2·ÏýôØ”]a;‡xc«áúB:.h4ißÑ‘ñK@§¯º;|Ý…úóçFO9{‡êjW—æ#ÕCÿçrûÅÿÎòM)x:<tôS;°6AAþún
™ÍG±7ÃgtïyJ³Pl~â¥"§ô€~>²2oTïZ]VåþïÐýwó~G5»)*yÇbŒ(ÿMÔxúœ‘¿]ìS6Ž„I\åjê	<i‚:6	“sKó•šg!,Rvt[!SÉÕå¹?ììÒìP§‰~7Á¾Ö]n¦ÏIš /þãCëÞ¯³Â,–BÆ‰éš¼±°LâZó‚¤#×{÷ §kô rƒc¥¯‹óÄÑñ¼
re*À±mØAµÐ€“]å÷ÿ[0±hÝ {»Ÿò;´n(Ñç“cz>Úh`äÍ<ÄhRª.Ó­„‹ ìChÃ1$+õ™–Î¯¹eÞï`Ê«hÿ'ªtŒú\Lá9oí1nJb mwÅ±sjŠíaO„u`þ#gæús?€äø&{sàòúÝ_íúŠ¾ß¼ÉJ8§ãdg¯pz°3‹‚apyÿÎŸÕËzg²zïŸaæúUAeûªOßN%ÔÁ6ÇdØ›œ[&ûLöïÓ±Uà‘éþÚe9U¶€fnd	ÐeI‡î÷Ïœf™÷N°üÁþÃÞåÈ5ãqc¬1WèË:,ý@vª°Ì\_+Ì	a™xîáæÊŽ™#F3w„¥×LŽoÓûÛ#è³£u6¨yãš7
ÃÉ‹ñ~}…‡WZ·ôWè³m³ê¤/séä_Î8•ïr01ÅlsFuzçÄn˜hV‹Ptay+ÍI¡ÀÈwg)ŸÜpLž2ô”Øã”­—Öê<7—‡ ©G×©Ñ¤KaeÖ¥¬Í÷ÖéwŽsÎ)ú í ­zšÜAœ„ršž(lën„š”áYAK´FgšPÇv YÉbða/ó6R×¦Œ!’¢Üqr£µÁ`'ü´2_3èF4(„àÍpÍµËë7o¤Ëaæ´Ù
®f¢²‡IÐ(˜´|¥Ìùs&ù ð¦·ùÕ"õ!¥×š'*úLd)›ý¤èa–4
Y	'òÆhøtOPp&*¬Ø3ShBí4åÉí¦›ëDI@®¡õqÐ‘°rCo,Dm‚T8p2ef^JŒs’Ñûéx·¡Gžã	 ¤{Z83ƒªN]öR>a„Äì0X(Ý$9&õ]„ªœê™aÚÐ±ÜJû¼¸CL–Ð-^6©YƒÍa—~ß§™hOYEÃ³÷ùñ€²;°qÂi»YCb/Øv}§ÊÙå]T¼”“r¢Q`,³ïßÄãˆ¡iá|†"œäd’nj:¶Ðe÷ˆ{´z‹Ù’-üÒ,ßž›4ÑM+×Igí¼R3YA>ð
Ë’ÍŒ™«zUÀËŸ`5¼­Éþ†4Pé¨¬Ö2^Ü3=®UÀWá'»šÔŠ›<ÏD)—Ûôç5Ú)»uÑaÙÑE•D‰ßr±u›ÐÅ€Që¥¹_OjYén0dw+7Uò&#Ž¸)žrBÖúþPÜ}Œîo´s2Â¤ŸXÝµö‘”ØŸ`‰¬Õ•€K›‹cwdÈ#AX7ò:Î’ºæÓ¥¥kkËñkíyâ[—õ!¯§‘SH¾Þ†—‡9‹¢Iþd|û1„”lº#[‚¡ÜL[ÞRQÙÎÄ­2·”[û÷àìÖí†…œu£Ðº†eFY"`è3¥]NtWYÎ¿$ÝÑÆ¾d˜QyzsÌïâ¶Hï²¦”5Cƒ‹GÍÿCÈ„°‡ñOÏå;‰ÆÓ>‚2ƒ=›!LgîÝ/yš…vµ‚¢ÆREÂ˜]ÿZEBÀÓ¨´{¨÷äès¯9tÞ!@)?­²O 4‹‘m4§ƒ¸!½|Äí‚… B9c²sÀ2&JMˆ ËCÈvk§üÌGvŒC<´¶¥;y1ðŒ!·÷Œ×‡v‚-m¨I·¤‚é!9äÏ½L¼™9oíU)¯˜'ûxŠå9Ê6È†£xzgã$DÂ‰F–÷:­­ÇNý¦¶€rKÄªý„ü'ØóÚˆêVÅ6ÈøãÔ[×÷Ž”¶}Z?*„9ÂæCÕ…x7“A?Sªú–n§¦Í™‹x(”ÒS11â7´ÎfË)s}kõ½*û{‹DæáEíÒúw6NëöŽû¥V³4ÜièÎ05òÚíÄ£<
ÝÄ·`4nÑ
×Á¬®rN^MãßÊ÷€¹e€´l?È½Qban·øå;«ôò<A{64ñÃÔâ}a©œÉºGåÚIR»È,Œj1Û’´†â2…Ž/ˆ)
ùk#›uš1fÒL½ZÉ¨9VŸ ¦0´oXabÛ¶çcTÞÎÄÒaQOsgœìjÅTçmäcôxì~s|ÈqüÛF±§Œa4Æ:ÚBk7×Ÿú ï±¬õ°)ñWàUÖ 5	<¹¹þlSG$„9\+ÝÒ9B)IàŽRkÍ‚ÈaÆ/ÞA(³f™|ýŠ_f¦–SÓä#‘@âë›eJû “òÝ:Æ-èž'
´a–ÐêžÇÍb _w‰ÊpAžÒxî˜ž[G¶§aè0¥g‚)Lµçõ€´¦wÌqA¡c¯FØ–çÁ6u•|Äï0¤	j.R1F€­ÑiÜ}£’%!º[èÈ¶N³ùtë ¥}ÞÃ•Ì†à8©ÿŽÓ“j¥Xä_P¢ýÃ{©NY¾IißhssýJõôv„ño¸A®þ»!ÇX©úš˜@Ø¥c`ŸV-GÐ%^=Ð95`>$yýóÉãd;êïžwd¤>Ñg ‹
ÔI‡Ï gìhßvŒg;0>@¨|¥.­ˆ2ì\˜`u.ƒØÚ­Ð‘×žàÖ` ‹*îøujç6pÍœ	/vqÝÇbT<ôõM"±¡þ¥†]hUvlëeF%¦k‚ÒÅ»æ ‘býâæj€€˜Ú-#—b`ÎPŠèÎ¾\±§é¾8;ØR3ôä´÷kyð¢œ13PÌä2BK\ZB×¬3)[²qL¦#L'õbHš&a•w;‰X}t2àïÄÆG9±š¶ƒÍ#Íã¬~c+þ..u´¬’ÅqYù ¹]/¹=‹DN)¼<‘’Œ86óÇb”À’8·Æâ¯jûMYD:À¿Gh¦ldÚN*9'2ve4dQ‹ao4?ÀÙ£H¢ØÅåƒÔ¯’¾ Ë'E˜C"Y†Õ#‘ùlt–øI»^8Éàª½z‰-»–qÀ€AÓËÆ»-Ú(½1`á»Cà_D£WncÏeáì#qm‘»c÷ÝÁ‰"êAöqˆ¦µ§a ü6„k˜é2ä.X’¸ÏŽ„­Ëó>H¤‰–\t©K‚¥4kíC¢&;0p‰å92z{~¿9‰ ©˜dõª`ëK2…Ë¶­Hl@<@åŽÛþóõäÃ7Eh†ÑÉwèž¾\é\ú% Ÿ‘Ž¨ý€útÕÀøg±‹áÂP€}€QA£Ü”ü[@<$nhÄD
ÿGœtwïÀ¸£k©vˆ	ž'”üYžß¢ æ;Ïì02{¤Ù›b½û×	ˆCxÎ€Æ–Ó3;½ŸL;²;f¦ÏRæÃ(Ÿù7¿ÌÜÅ·ØÁ9újc‰Åø!@'ƒÿs"ä9	r<R±;³pT“Iš‘7`1Q¼7CNˆÊKŽî]5eÒœ¸¦lk•QjZQrú±81~/õoB÷ÒòÒÿj˜EËh`SX¿­¸ÈÆÏÅ.½×‡þ•H²Æ5RÈƒD^9Xá†žï¾Ï#ûØ^R8a¨÷Wi¸bh¨ÁSˆ~}Ç¦S¼ys’ÖsÀÄ(€‰tº’Ö9C!ŒX5°õ<Pd_Pó óå X&ŠkÅ"4gìÁÜ‡n0–ù¡‡kÅîî‘5G ÄGÎ7¢AßËÅí¯;
†6ÎˆÁ‘9€L
xÊúK‘>š¥% Ü´Å.Aâ‰	çýN^br ø¦Q`[ÛL÷·/Ä¿h	öº ia¢J³Øgµa	,·†á8¹FNÛg˜GòNzi’EèJ9Œ±1o˜sDRÜAÜS(üˆWÙæGµá	2"ý#ûË#E¢'ÃhÄñ8B½1ú‡QÓÐÑæ}›p¬ua{ŠprÐÏ23>›5$]ÚAûƒàD,[‘¡³=eåÊ
v"Þ§C¿Â¬wZàÊ˜¦Ep5¹÷V‹œöö°jv\«RPÑÐ•é’¤Q½ˆ¬e¶F@'e9½‰ÆKkã4ßý+´¦[ŠÔM0<ŠÍ€…W}©#¯Þš½@FÁÓ™­-§#¿2–rÿ©è>pÅ¹ž.þŠçðÌ¸Â¦ÔP“"ß4Ñ£õ’LÈÁH.KÄ©lÍ†ÍùMC ÂC‘}-PîŒÃzìrbd†¦;³:&ÀDpm	ôwÇÄÞJ>Ÿ«…%gòê“G%kÓo¦üŠ)·VžsNw-Í]"Y}Ú¤Î5 T,²çòãXÏ8''®&íl3ÖöX“ŽS¼ýÀg¿@üüÏ4=ü½ú*Ü2[+äýtBLnf{c½kb	r*Ójº*1ßÕÎ¹R>×ÐýNúxËq’ì(]²oFL©ªñIÊLøÄýžµš/h/è¨LI "¨ÉàÀá€6Ñ»°w}b‘?Šæ&¥D–ÚøÆ.$½{°zãôWÌRQ ûof°ú–šl¡Ç:MÝÛî¿}
~6`$ ºÉ«ëâzôßÂÐ¢,wïÆU+§¶ñï¥¦D|úû) ”·ÅþqÌm×