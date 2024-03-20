function setupHTML() {
	
	
	
	



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
	//tmp.el.loading.setDisplay(!tmp.start)
	//tmp.el.app.setDisplay(tmp.start)
    tmp.el.nsoftcap1.setDisplay(player.misc.hNum.gte("e100"))
    tmp.el.nsoftcap1.setHTML(`
    Due to excess number, starting at e100 number number gain is divided by ${format(FORMS.number.softcap1())}!
    `)
    tmp.el.number.setHTML(`
    Number: ${format(player.number, 2)} | ${formatGain(player.number, tmp.numberGain.mul(tmp.gs))}
    `)
}