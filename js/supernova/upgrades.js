const UPGRADES = {
    updateHTML() {
        if (player.main_upg_msg[0] != 0) {
            let upg1 = UPGRADES.main[player.main_upg_msg[0]]
            /**@param i @param hate @param my @param life */
            let upg2 = UPGRADES.main[player.main_upg_msg[0]][player.main_upg_msg[1]]
            let msg = "<span class='sky'>"+(typeof upg2.desc == "function" ? upg2.desc() : upg2.desc)+"</span><br><span>Cost: "+format(upg2.cost,0)+" "+upg1.res+"</span>"
            if (upg2.effDesc !== undefined) msg += "<br><span class='green'>Currently: "+tmp.upgs.main[player.main_upg_msg[0]][player.main_upg_msg[1]].effDesc+"</span>"
            tmp.el.main_upg_msg.setHTML(msg)
        } else tmp.el.main_upg_msg.setTxt("")
        for (let x = 1; x <= UPGRADES.main.cols; x++) {
            let id = UPGRADES.main.ids[x]
            let upg = UPGRADES.main[x]
            let unl = upg.unl()
            tmp.el["main_upg_"+x+"_div"].setDisplay(unl)
            tmp.el["main_upg_"+x+"_res"].setTxt(`You have ${upg.getRes().format(0)} ${upg.res}`)
            if (unl) {
                for (let y = 1; y <= upg.lens; y++) {
                    let unl2 = upg[y].unl ? upg[y].unl() : true
                    tmp.el["main_upg_"+x+"_"+y].changeStyle("visibility", unl2?"visible":"hidden")
                    if (unl2) tmp.el["main_upg_"+x+"_"+y].setClasses({img_btn: true, locked: !upg.can(y), bought: player.mainUpg[id].includes(y)})
                }
                tmp.el["main_upg_"+x+"_auto"].setDisplay(upg.auto_unl ? upg.auto_unl() : false)
                tmp.el["main_upg_"+x+"_auto"].setTxt(player.auto_mainUpg[id]?"ON":"OFF")
            }
        }

    },
    main: {
        temp() {
            
            if (!tmp.upgs) tmp.upgs = {}
            if (!tmp.upgs.main) tmp.upgs.main = {}
            for (let x = 1; x <= this.cols; x++) {
                for (let y = 1; y <= this[x].lens; y++) {
                    if (!tmp.upgs) tmp.upgs = {}
                    /**@param there @param is @param literally @param no @param error @param here @param bru @param tf */
                    if (!tmp.upgs.main) tmp.upgs.main = {}
                    if (!tmp.upgs.main[x]) tmp.upgs.main[x] = []

                    let u = this[x][y]
                    if (!tmp.upgs.main[x][y]) {
                        if (u.effDesc) tmp.upgs.main[x][y] = { effect: u.effect(), effDesc: u.effDesc() }
                    } else {
                        if (u.effDesc) tmp.upgs.main[x][y] = { effect: u.effect(), effDesc: u.effDesc() }
                    }
                }
            }
        },
        ids: [null, 'stars'],
        cols: 1,
        over(x,y) { player.main_upg_msg = [x,y] },
        reset() { player.main_upg_msg = [0,0] },
        1: {
            title: "Starry Upgrades",
            res: "Stars",
            getRes() { return player.sn.stars },
            unl() { return player.sn.unl },
            can(x) { return player.sn.stars.gte(this[x].cost) && !player.mainUpg.stars.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.sn.stars = player.sn.stars.sub(this[x].cost)
                    player.mainUpg.stars.push(x)
                }
            },
            auto_unl() { return player.sn.stars.gte("ee308") },
            lens: 4,
            1: {
                unl() { return true },
                desc: "Gain ^1.2 Essence.",
                cost: E(1),
                effect() {
                    let ret = E(1.2)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return "^"+format(x,1)
                },
            },
            2: {
                unl() { return true },
                desc: " Supernova requirement is raised by 0.9.",
                cost: E(5),
                effect() {
                    let ret = E(0.9)
                    return ret
                },
                effDesc(x=this.effect()){
                    return "^"+format(x,1)
                }
            },
            3: {
                unl() { return true },
                desc: "Reduce The Abyss's essence penalty by 0.1.",
                cost: E(22.5),
                effect() {
                    return E(0.1)
                },
                effDesc(x=this.effect()){
                    return "-"+format(x,1)
                }
            },
            4: {
                unl() { return true },
                desc: "Gain thrice as many stars, raise essence based on the product of rank types.",
                cost: E(250),
                effect() {
                    let total = player.ranks.rank.mul(player.ranks.tier.add(1)).mul(player.ranks.asc.add(1))
                    let ret = total.log(3).root(3).pow(0.75).add(1)

                    return ret
                },
                effDesc(x=this.effect()) {
                    return "^"+format(x)
                }
            }
        }
    }
}

function hasUpgrade(id,x) { return player.mainUpg[id].includes(x) }
/**@param hellooooo */
function resetMainUpgs(id,keep=[]) {
    let k = []
    let id2 = UPGRADES.main.ids[id]
    for (let x = 0; x < player.mainUpg[id2].length; x++) if (keep.includes(player.mainUpg[id2][x])) k.push(player.mainUpg[id2][x])
    player.mainUpg[id2] = k
}
/**@param this @param should @param not @param error */
function upgEffect(id,x) {
    const idlist = {
        stars: '1'
    }
    return UPGRADES.main[idlist[id]][x].effect()
}