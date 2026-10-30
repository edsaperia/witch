# Combined creature age-size audit

Art source: f01d83885e1fdf7fd1e1ae1a3638dcad19bfa767. Command: `node tools/body-graph/age-size-audit.mjs previews/combined-size-final`. Standing witch: **43 occupied pixels**. All 1,040 cells reach their exact occupied targets; strict within-species growth, legend/adult >=1.75 and class gaps >=2 pass.

The walk atlas estimate is **67.85 MiB** for all species, or **14.79 MiB** for the eight largest species pages. This is real baked-palette indexing plus conservative per-species shelf packing, not measured runtime GPU residency. It excludes rigs, gear and sleeping/woken sets. No estimated page exceeds4096.

Construction maximum: 60754 ms; bake maximum: 522 ms. These cold generation timings were taken on a shared laptop with concurrent CPU work, not gameplay frame costs. They expose a generation-cost risk requiring cloud performance review. No resource or performance gate is relaxed.

|Age|Class|Species|Art|Target occupied px|Measured occupied range|Allocated height range|Max width|
|---:|---:|---|---|---:|---|---|---:|
|0|0|woodlouse|redesigned|32|32–32|39–41|72|
|0|0|snail|current|32|32–32|38–39|74|
|0|0|moth|current|32|32–32|35–37|58|
|0|0|dragonfly|redesigned|32|32–32|37–38|46|
|0|0|beetle|current|32|32–32|38–39|63|
|0|0|scorpion|current|32|32–32|37–39|62|
|0|1|newt|current|33|33–33|38–38|72|
|0|1|salamander|current|33|33–33|38–38|63|
|0|1|dormouse|redesigned|33|33–33|38–38|38|
|0|1|toad|current|33|33–33|39–40|56|
|0|1|crab|redesigned|33|33–33|41–41|66|
|0|1|spider|current|33|33–33|38–39|53|
|0|2|mole|current|34|34–34|41–44|59|
|0|2|stoat|redesigned|34|34–34|38–39|55|
|0|2|squirrel|current|34|34–34|38–39|31|
|0|2|flyingsquirrel|redesigned|34|34–34|39–39|52|
|0|3|hedgehog|current|35|35–35|41–42|49|
|0|3|meerkat|redesigned|35|35–35|40–41|46|
|0|3|fennec|redesigned|35|35–35|39–40|29|
|0|3|marten|redesigned|35|35–35|40–40|61|
|0|3|owl|current|35|35–35|41–41|37|
|0|3|raven|current|35|35–35|41–41|44|
|0|3|heron|current|35|35–35|40–44|34|
|0|3|rattlesnake|current|35|35–35|43–47|118|
|0|3|bat|redesigned|35|35–35|39–41|53|
|0|4|cat|current|35|35–35|39–41|33|
|0|4|arcticfox|redesigned|35|35–35|40–40|41|
|0|4|hare|current|35|35–35|40–42|29|
|0|4|armadillo|current|35|35–35|41–42|59|
|0|5|fox|current|36|36–36|40–43|30|
|0|5|badger|redesigned|36|36–36|41–41|48|
|0|5|otter|redesigned|36|36–36|41–41|49|
|0|5|raccoon|redesigned|36|36–36|41–41|54|
|0|5|redpanda|current|36|36–36|41–41|64|
|0|6|lynx|current|37|37–37|41–42|31|
|0|6|beaver|current|37|37–37|42–42|45|
|0|6|roe|current|37|37–37|41–43|33|
|0|6|penguin|current|37|37–37|43–44|37|
|0|6|snake|current|37|37–37|43–47|109|
|0|7|wolf|redesigned|38|38–38|43–44|37|
|0|7|cheetah|current|38|38–38|43–44|54|
|0|7|snowleopard|current|38|38–38|43–43|56|
|0|7|jaguar|redesigned|38|38–38|43–43|50|
|0|7|ibex|current|38|38–38|43–45|35|
|0|7|ram|current|38|38–38|43–44|34|
|0|7|boar|current|38|38–38|43–44|47|
|0|7|komodo|current|38|38–38|42–44|116|
|0|8|tiger|current|39|39–39|44–44|48|
|0|8|lion|current|39|39–39|44–45|50|
|0|8|stag|current|39|39–39|44–45|41|
|0|8|sphinx *|current|39|39–39|44–44|55|
|0|8|griffin *|current|39|39–39|44–45|40|
|0|9|bear|redesigned|39|39–39|44–44|49|
|0|9|polarbear|current|39|39–39|43–45|54|
|0|9|elk|current|39|39–39|44–45|49|
|0|9|crocodile|redesigned|39|39–39|43–44|115|
|0|9|unicorn *|current|39|39–39|43–45|48|
|0|9|featheredserpent *|current|39|39–39|45–49|116|
|0|10|rhino|current|41|41–41|46–47|57|
|0|10|frosttroll *|redesigned|41|41–41|47–47|40|
|0|10|hydra *|redesigned|41|41–41|47–50|79|
|0|10|frostwyrm *|current|41|41–41|45–46|47|
|0|11|elephant|current|52|52–52|57–57|69|
|0|11|stegosaurus *|current|52|52–52|57–58|88|
|1|0|woodlouse|redesigned|47|47–47|54–58|109|
|1|0|snail|current|47|47–47|55–55|91|
|1|0|moth|current|47|47–47|51–54|85|
|1|0|dragonfly|redesigned|47|47–47|53–53|73|
|1|0|beetle|current|47|47–47|54–56|106|
|1|0|scorpion|current|47|47–47|54–57|84|
|1|1|newt|current|49|49–49|54–55|104|
|1|1|salamander|current|49|49–49|54–56|112|
|1|1|dormouse|redesigned|49|49–49|55–56|85|
|1|1|toad|current|49|49–49|57–60|81|
|1|1|crab|redesigned|49|49–49|58–58|106|
|1|1|spider|current|49|49–49|56–57|77|
|1|2|mole|current|50|50–50|60–62|104|
|1|2|stoat|redesigned|50|50–50|56–56|72|
|1|2|squirrel|current|50|50–50|55–56|53|
|1|2|flyingsquirrel|redesigned|50|50–50|56–58|88|
|1|3|hedgehog|current|52|52–52|63–63|86|
|1|3|meerkat|redesigned|52|52–52|59–60|71|
|1|3|fennec|redesigned|52|52–52|58–59|82|
|1|3|marten|redesigned|52|52–52|58–58|97|
|1|3|owl|current|52|52–52|58–59|44|
|1|3|raven|current|52|52–52|60–63|85|
|1|3|heron|current|52|52–52|58–63|43|
|1|3|rattlesnake|current|52|52–52|62–65|146|
|1|3|bat|redesigned|52|52–52|54–59|79|
|1|4|cat|current|54|54–54|60–61|67|
|1|4|arcticfox|redesigned|54|54–54|60–61|90|
|1|4|hare|current|54|54–54|59–63|51|
|1|4|armadillo|current|54|54–54|64–65|106|
|1|5|fox|current|55|55–55|60–62|108|
|1|5|badger|redesigned|55|55–55|61–62|87|
|1|5|otter|redesigned|55|55–55|60–62|127|
|1|5|raccoon|redesigned|55|55–55|61–62|97|
|1|5|redpanda|current|55|55–55|62–63|106|
|1|6|lynx|current|57|57–57|63–65|66|
|1|6|beaver|current|57|57–57|64–65|113|
|1|6|roe|current|57|57–57|62–65|70|
|1|6|penguin|current|57|57–57|65–65|45|
|1|6|snake|current|57|57–57|66–74|190|
|1|7|wolf|redesigned|58|58–58|64–66|107|
|1|7|cheetah|current|58|58–58|64–66|101|
|1|7|snowleopard|current|58|58–58|64–65|115|
|1|7|jaguar|redesigned|58|58–58|64–66|128|
|1|7|ibex|current|58|58–58|63–65|73|
|1|7|ram|current|58|58–58|63–65|82|
|1|7|boar|current|58|58–58|64–65|91|
|1|7|komodo|current|58|58–58|63–65|181|
|1|8|tiger|current|60|60–60|67–68|129|
|1|8|lion|current|60|60–60|67–69|124|
|1|8|stag|current|60|60–60|65–66|53|
|1|8|sphinx *|current|60|60–60|67–68|122|
|1|8|griffin *|current|60|60–60|66–67|82|
|1|9|bear|redesigned|61|61–61|68–69|98|
|1|9|polarbear|current|61|61–61|67–69|104|
|1|9|elk|current|61|61–61|67–68|88|
|1|9|crocodile|redesigned|61|61–61|66–66|194|
|1|9|unicorn *|current|61|61–61|66–67|97|
|1|9|featheredserpent *|current|61|61–61|68–74|167|
|1|10|rhino|current|63|63–63|69–71|115|
|1|10|frosttroll *|redesigned|63|63–63|71–72|60|
|1|10|hydra *|redesigned|63|63–63|70–74|127|
|1|10|frostwyrm *|current|63|63–63|68–70|125|
|1|11|elephant|current|65|65–65|71–72|103|
|1|11|stegosaurus *|current|65|65–65|72–73|141|
|2|0|woodlouse|redesigned|77|77–77|84–84|182|
|2|0|snail|current|77|77–77|85–87|114|
|2|0|moth|current|77|77–77|81–81|124|
|2|0|dragonfly|redesigned|77|77–77|84–84|122|
|2|0|beetle|current|77|77–77|82–82|169|
|2|0|scorpion|current|77|77–77|86–86|128|
|2|1|newt|current|82|82–82|89–90|154|
|2|1|salamander|current|82|82–82|89–89|165|
|2|1|dormouse|redesigned|82|82–82|90–92|133|
|2|1|toad|current|82|82–82|86–86|121|
|2|1|crab|redesigned|82|82–82|86–86|172|
|2|1|spider|current|82|82–82|87–87|117|
|2|2|mole|current|87|87–87|91–91|168|
|2|2|stoat|redesigned|87|87–87|94–95|149|
|2|2|squirrel|current|87|87–87|93–94|86|
|2|2|flyingsquirrel|redesigned|87|87–87|96–98|158|
|2|3|hedgehog|current|91|91–91|102–102|126|
|2|3|meerkat|redesigned|91|91–91|100–101|132|
|2|3|fennec|redesigned|91|91–91|97–100|126|
|2|3|marten|redesigned|91|91–91|99–101|186|
|2|3|owl|current|91|91–91|95–95|62|
|2|3|raven|current|91|91–91|104–108|167|
|2|3|heron|current|91|91–91|100–106|70|
|2|3|rattlesnake|current|91|91–91|105–108|202|
|2|3|bat|redesigned|91|91–91|96–104|133|
|2|4|cat|current|96|96–96|103–104|118|
|2|4|arcticfox|redesigned|96|96–96|105–106|173|
|2|4|hare|current|96|96–96|103–104|80|
|2|4|armadillo|current|96|96–96|104–104|190|
|2|5|fox|current|101|101–101|109–109|158|
|2|5|badger|redesigned|101|101–101|109–109|179|
|2|5|otter|redesigned|101|101–101|109–111|231|
|2|5|raccoon|redesigned|101|101–101|110–111|181|
|2|5|redpanda|current|101|101–101|109–112|191|
|2|6|lynx|current|106|106–106|114–116|117|
|2|6|beaver|current|106|106–106|116–119|197|
|2|6|roe|current|106|106–106|114–116|117|
|2|6|penguin|current|106|106–106|119–119|75|
|2|6|snake|current|106|106–106|120–129|267|
|2|7|wolf|redesigned|110|110–110|118–120|179|
|2|7|cheetah|current|110|110–110|120–120|196|
|2|7|snowleopard|current|110|110–110|120–120|213|
|2|7|jaguar|redesigned|110|110–110|120–124|227|
|2|7|ibex|current|110|110–110|117–118|113|
|2|7|ram|current|110|110–110|118–119|127|
|2|7|boar|current|110|110–110|119–122|179|
|2|7|komodo|current|110|110–110|117–120|339|
|2|8|tiger|current|115|115–115|125–129|233|
|2|8|lion|current|115|115–115|126–129|219|
|2|8|stag|current|115|115–115|122–123|88|
|2|8|sphinx *|current|115|115–115|125–126|181|
|2|8|griffin *|current|115|115–115|123–125|145|
|2|9|bear|redesigned|120|120–120|131–133|178|
|2|9|polarbear|current|120|120–120|131–132|202|
|2|9|elk|current|120|120–120|129–131|158|
|2|9|crocodile|redesigned|120|120–120|127–128|378|
|2|9|unicorn *|current|120|120–120|128–131|181|
|2|9|featheredserpent *|current|120|120–120|133–141|287|
|2|10|rhino|current|124|124–124|133–136|218|
|2|10|frosttroll *|redesigned|124|124–124|130–130|116|
|2|10|hydra *|redesigned|124|124–124|137–143|241|
|2|10|frostwyrm *|current|124|124–124|131–133|220|
|2|11|elephant|current|129|129–129|138–140|205|
|2|11|stegosaurus *|current|129|129–129|139–140|261|
|3|0|woodlouse|redesigned|135|135–135|146–146|303|
|3|0|snail|current|135|135–135|150–150|202|
|3|0|moth|current|135|135–135|141–141|220|
|3|0|dragonfly|redesigned|135|135–135|146–146|242|
|3|0|beetle|current|135|135–135|142–142|170|
|3|0|scorpion|current|135|135–135|148–149|162|
|3|1|newt|current|144|144–144|167–174|276|
|3|1|salamander|current|144|144–144|148–148|209|
|3|1|dormouse|redesigned|144|144–144|156–156|179|
|3|1|toad|current|144|144–144|150–150|220|
|3|1|crab|redesigned|144|144–144|150–150|348|
|3|1|spider|current|144|144–144|151–151|144|
|3|2|mole|current|153|153–153|159–159|268|
|3|2|stoat|redesigned|153|153–153|156–156|254|
|3|2|squirrel|current|153|153–153|161–163|120|
|3|2|flyingsquirrel|redesigned|153|153–153|166–166|280|
|3|3|hedgehog|current|160|160–160|176–176|267|
|3|3|meerkat|redesigned|160|160–160|165–165|216|
|3|3|fennec|redesigned|160|160–160|170–174|248|
|3|3|marten|redesigned|160|160–160|171–178|340|
|3|3|owl|current|160|160–160|166–166|185|
|3|3|raven|current|160|160–160|175–183|250|
|3|3|heron|current|160|160–160|172–183|110|
|3|3|rattlesnake|current|160|160–160|177–177|166|
|3|3|bat|redesigned|160|160–160|167–167|155|
|3|4|cat|current|168|168–168|169–169|195|
|3|4|arcticfox|redesigned|168|168–168|179–183|307|
|3|4|hare|current|168|168–168|175–181|112|
|3|4|armadillo|current|168|168–168|181–181|187|
|3|5|fox|current|177|177–177|178–178|239|
|3|5|badger|redesigned|177|177–177|189–194|274|
|3|5|otter|redesigned|177|177–177|180–180|372|
|3|5|raccoon|redesigned|177|177–177|182–182|305|
|3|5|redpanda|current|177|177–177|191–191|336|
|3|6|lynx|current|186|186–186|197–199|152|
|3|6|beaver|current|186|186–186|204–207|368|
|3|6|roe|current|186|186–186|187–187|142|
|3|6|penguin|current|186|186–186|190–190|139|
|3|6|snake|current|186|186–186|205–216|673|
|3|7|wolf|redesigned|193|193–193|206–211|348|
|3|7|cheetah|current|193|193–193|199–199|291|
|3|7|snowleopard|current|193|193–193|199–200|274|
|3|7|jaguar|redesigned|193|193–193|208–212|423|
|3|7|ibex|current|193|193–193|203–204|166|
|3|7|ram|current|193|193–193|194–194|202|
|3|7|boar|current|193|193–193|205–207|246|
|3|7|komodo|current|193|193–193|204–208|572|
|3|8|tiger|current|202|202–202|206–206|388|
|3|8|lion|current|202|202–202|216–226|304|
|3|8|stag|current|202|202–202|213–215|197|
|3|8|sphinx *|current|202|202–202|213–215|234|
|3|8|griffin *|current|202|202–202|208–208|223|
|3|9|bear|redesigned|210|210–210|226–231|303|
|3|9|polarbear|current|210|210–210|224–230|334|
|3|9|elk|current|210|210–210|211–211|208|
|3|9|crocodile|redesigned|210|210–210|220–222|668|
|3|9|unicorn *|current|210|210–210|216–216|278|
|3|9|featheredserpent *|current|210|210–210|227–227|365|
|3|10|rhino|current|217|217–217|221–221|361|
|3|10|frosttroll *|redesigned|217|217–217|220–220|181|
|3|10|hydra *|redesigned|217|217–217|236–237|330|
|3|10|frostwyrm *|current|217|217–217|228–231|479|
|3|11|elephant|current|226|226–226|237–244|435|
|3|11|stegosaurus *|current|226|226–226|234–234|405|

Asterisk: mythical/extinct design placement; see [rank rationale](ranks.md).

## Native pixel ties

- Age0, 32px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age0, 33px: newt, salamander, dormouse, toad, crab, spider
- Age0, 34px: mole, stoat, squirrel, flyingsquirrel
- Age0, 35px: hedgehog, meerkat, fennec, marten, owl, raven, heron, rattlesnake, bat, cat, arcticfox, hare, armadillo
- Age0, 36px: fox, badger, otter, raccoon, redpanda
- Age0, 37px: lynx, beaver, roe, penguin, snake
- Age0, 38px: wolf, cheetah, snowleopard, jaguar, ibex, ram, boar, komodo
- Age0, 39px: tiger, lion, stag, sphinx, griffin, bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age0, 41px: rhino, frosttroll, hydra, frostwyrm
- Age0, 52px: elephant, stegosaurus
- Age1, 47px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age1, 49px: newt, salamander, dormouse, toad, crab, spider
- Age1, 50px: mole, stoat, squirrel, flyingsquirrel
- Age1, 52px: hedgehog, meerkat, fennec, marten, owl, raven, heron, rattlesnake, bat
- Age1, 54px: cat, arcticfox, hare, armadillo
- Age1, 55px: fox, badger, otter, raccoon, redpanda
- Age1, 57px: lynx, beaver, roe, penguin, snake
- Age1, 58px: wolf, cheetah, snowleopard, jaguar, ibex, ram, boar, komodo
- Age1, 60px: tiger, lion, stag, sphinx, griffin
- Age1, 61px: bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age1, 63px: rhino, frosttroll, hydra, frostwyrm
- Age1, 65px: elephant, stegosaurus
- Age2, 77px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age2, 82px: newt, salamander, dormouse, toad, crab, spider
- Age2, 87px: mole, stoat, squirrel, flyingsquirrel
- Age2, 91px: hedgehog, meerkat, fennec, marten, owl, raven, heron, rattlesnake, bat
- Age2, 96px: cat, arcticfox, hare, armadillo
- Age2, 101px: fox, badger, otter, raccoon, redpanda
- Age2, 106px: lynx, beaver, roe, penguin, snake
- Age2, 110px: wolf, cheetah, snowleopard, jaguar, ibex, ram, boar, komodo
- Age2, 115px: tiger, lion, stag, sphinx, griffin
- Age2, 120px: bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age2, 124px: rhino, frosttroll, hydra, frostwyrm
- Age2, 129px: elephant, stegosaurus
- Age3, 135px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age3, 144px: newt, salamander, dormouse, toad, crab, spider
- Age3, 153px: mole, stoat, squirrel, flyingsquirrel
- Age3, 160px: hedgehog, meerkat, fennec, marten, owl, raven, heron, rattlesnake, bat
- Age3, 168px: cat, arcticfox, hare, armadillo
- Age3, 177px: fox, badger, otter, raccoon, redpanda
- Age3, 186px: lynx, beaver, roe, penguin, snake
- Age3, 193px: wolf, cheetah, snowleopard, jaguar, ibex, ram, boar, komodo
- Age3, 202px: tiger, lion, stag, sphinx, griffin
- Age3, 210px: bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age3, 217px: rhino, frosttroll, hydra, frostwyrm
- Age3, 226px: elephant, stegosaurus

Full per-cell measurements, page indexability and cold construction costs are in [the data](age-sizes.json). CI art review and contact sheets remain separate gates.
