function setupHTML() {
	
	let table = ''
	
	//setupModsHTML()

	TAB_TERMINAL.setup()
	//there is NO buyables line here!
	let rank_table = new Element('rank_table')
	for (let i = 0; i < RANKS.names.length; i++) {
		let rn = RANKS.names[i]
		table += `
		<div id="${rn}_div">
		<span id="${rn}" class="charged_text"></div>
		<button id="${rn}_btn" onclick="RANKS.reset('${rn}')" class="btn" style="min-width: 250px; min-height: 130px;"><span id="${rn}_msg">Reset your progress, but ${rn} up for a powerful boost. </span><span id="${rn}_desc"></span></button>
		</div>
		`
	}
	rank_table.setHTML(table)
	let upgs_table = new Element("upgs_table")
	table = ""
	for (let x = 1; x <= UPGRADES.main.cols; x++) {
		let id = UPGRADES.main.ids[x]
		table += `<div id="main_upg_${x}_div" style="width: 230px; margin: 0px 10px;"><b>${UPGRADES.main[x].title}</b><br><br><div style="font-size: 13px; min-height: 50px" id="main_upg_${x}_res"></div><br><div class="table_center" style="justify-content: start;">`
		for (let y = 1; y <= UPGRADES.main[x].lens; y++) {
			let key = UPGRADES.main[x][y]
			table += `<img onclick="UPGRADES.main[${x}].buy(${y})" onmouseover="UPGRADES.main.over(${x},${y})" onmouseleave="UPGRADES.main.reset()"
			 style="margin: 3px;" class="img_btn" id="main_upg_${x}_${y}" src="images/${UPGRADE_IMAGES[x]||test}.png">`
		}
		table += `</div><br><button id="main_upg_${x}_auto" class="btn" style="width: 80px;" onclick="player.auto_mainUpg.${id} = !player.auto_mainUpg.${id}">OFF</button></div>`
	}
	upgs_table.setHTML(table)
	/*for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div style="width: 300px" id="ranks_div_${x}">
			<button id="ranks_auto_${x}" class="btn" style="width: 80px;" onclick="RANKS.autoSwitch('${rn}')">OFF</button>
			<span id="ranks_scale_${x}""></span>${RANKS.fullNames[x]} <h4 id="ranks_amt_${x}">X</h4><br><br>
			<button onclick="RANKS.reset('${rn}')" class="btn reset" id="ranks_${x}">
				Reset your ${x>0?RANKS.fullNames[x-1]+"s":'mass and upgrades'}, but ${RANKS.fullNames[x]} up.<span id="ranks_desc_${x}"></span><br>
				Req: <span id="ranks_req_${x}">X</span>
			</button>
		</div>`
	}*/
	let choose_rank_stabs = new Element("choose_rank_stabs")
	table = ""
	for (let x = 0; x < RANKS.stabs.length; x++)  {
		let id = RANKS.stabs[x]
		let fullname = RANKS.fstabs[x]
		table += `<button id="choose_rank_stab_${id}" onclick="player.rankstab = '${id}'">${RANKS.fstabs[id]}</button>`

	}
	choose_rank_stabs.setHTML(table)
	let crrst = new Element("choose_rank_reward_stab_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++)  {
		let rn = RANKS.names[x]
		table += `<button id="choose_rank_reward_stab_${rn}" onclick="player.rankrewardstab = '${rn}'">${rn}</button>`
	}
	crrst.setHTML(table)
	let ranks_rewards_table = new Element("ranks_rewards_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div id="ranks_reward_div_${rn}">`
		let keys = Object.keys(RANKS.desc[rn])
		for (let y = 0; y < keys.length; y++) {
			table += `<span id="ranks_reward_${rn}_${y}"><b>${RANKS.fullnames[x]} ${keys[y]}:</b> ${RANKS.desc[rn][keys[y]]}${RANKS.effects[rn][keys[y]]?` Currently: <span id='ranks_eff_${rn}_${y}'></span>`:""}</span><br>`
		}
		table += `</div>`
	}
	ranks_rewards_table.setHTML(table)

	tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}

	
}

function updateHTML() {
	let els = document.getElementsByTagName("*")
	for (let i=0;i<els.length;i++) {
		let el = els[i]
		if (!tmp.el[el.id]) {
			tmp.el[el.id] = new Element(el)
		}

	}
	//updateModsHTML()
	ABYSS.update()
	tmp.el.loading.setDisplay(!tmp.start)
	tmp.el.app.setDisplay(tmp.start)
    tmp.el.Essence.setHTML(`
    <br>Essence: ${format(player.essence)} ${formatGain(player.essence, tmp.essenceGain.mul(tmp.gs))}   <br> <br> <br>
    `)
	tmp.el.Prestige.setDisplay(!tmp.pres.auto)
	/** */
	tmp.el.EssSoft1.setDisplay(player.misc.hEss.gte("e33"))
	tmp.el.EssSoft1.setHTML(`Due to unstable essence, after ${format(FORMS.essence.soft1start())} essence, the gain will be softcapped!<br>`)
	/** */
	tmp.el.EssSoft2.setDisplay(player.misc.hEss.gte("e110"))
	tmp.el.EssSoft2.setHTML(`Due to excessive strange essence, starting at ${format(FORMS.essence.soft2start())} essence, the gain will be softcapped^2!<br>`)
	/** */
	tmp.el.PresSoft1.setHTML(`<br>Due to excess Prestige Shards, starting at ${format(FORMS.presScs.soft1start())} PS their gain is softcapped!`)
	tmp.el.PresSoft1.setDisplay(player.misc.hPres.gte("e10"))
	/** */
	tmp.el.PresSoft2.setHTML(`Due to high amounts of fragile shards, starting at ${format(FORMS.presScs.soft2start())} PS their gain is softcapped^2`)
	tmp.el.PresSoft2.setDisplay(player.misc.hPres.gte("e21"))
	tmp.el.Prestige.setHTML(tmp.pres.can?`<i><b>Prestige</b> and reset your essence for <b>Prestige Shards</b></i>`:`<i>Locked.</i>`)
	tmp.el.prespts.setHTML(`
	<br>Prestige Shards: ${format(player.pres.pts)} ${tmp.pres.auto ? formatGain(player.pres.pts, tmp.pres.gain.mul(tmp.gs)) : `(+${format(tmp.pres.gain)})`}
	<br>Effect: ${formatMult(FORMS.pres.effect())} Essence
	`)
	updateRanksHTML()
	updateEclipseHTML()
	SUPERNOVA.updateHTML()
	updateSettingsHTML()
	TABS.update()
	TAB_TERMINAL.refresh()
}