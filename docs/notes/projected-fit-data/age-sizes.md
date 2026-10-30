# Combined creature age-size audit

The audit passed: 64 species, 1,040 cells, no unsafe target deviation, no strict-growth/legend/class-order failure and no page overflow. The measured source is `043d8fadcc2073acadedac15262e75bae7005172`; `8f8d137d8e1a347789f5d28f7acba81a1faee9d6` changes only import quoting for the Art Lab inliner, with identical native rendering.

The same three cells measured on a quiet CPU against base `909f00ae`: rhino legend towards/frame1 **1.187s versus 1.716s**, unicorn adult towards/frame0 **0.138s versus 0.206s**, hedgehog legend away/frame1 **0.545s versus 2.321s**. These are cold construction measurements, not gameplay frame times. Shared-laptop timings during the full audit include concurrent build work; they should not be compared directly to the quiet CPU sample.

Source 043d8fadcc2073acadedac15262e75bae7005172. Standing witch: 43 occupied art pixels. At most **±1 native pixel** from the nominal target is permitted, narrowed by hard age bands, strict growth, legend/adult ratio and class ordering. All gait frames and both facings; full allocation includes padding and decoration. Real species use broad mass cohorts; * marks mythical/extinct design placements ([rationale](ranks.md)).

Walk-atlas estimate: 67.89 MiB all species; 14.79 MiB eight largest species pages. Real palette indexability, conservative shelf packing; excludes rigs/gear/sleep/wake and is not measured runtime residency. Third full rasters: 0/1040; over three: 0; max sparse probes: 16. Cold construction max 6530ms, bake max 89ms on the shared laptop; not a gameplay frame-time measurement.

|Age|Class|Species|Art|Nominal px|Safe px interval|Occupied range|Allocated h|Max width|
|---:|---:|---|---|---:|---|---|---|---:|
|0|0|woodlouse|redesigned|32|32–32|32–32|39–41|72|
|0|0|snail|current|32|32–32|32–32|38–39|74|
|0|0|moth|current|32|32–32|32–32|35–37|58|
|0|0|dragonfly|redesigned|32|32–32|32–32|37–38|46|
|0|0|beetle|current|32|32–32|32–32|38–39|63|
|0|0|scorpion|current|32|32–32|32–32|37–39|62|
|0|1|newt|current|33|32–33|33–33|38–38|72|
|0|1|salamander|current|33|32–33|33–33|38–38|63|
|0|1|dormouse|redesigned|33|32–33|33–33|38–38|38|
|0|1|toad|current|33|32–33|32–33|38–40|56|
|0|1|crab|redesigned|33|32–33|32–32|40–40|64|
|0|1|spider|current|33|32–33|32–33|38–39|53|
|0|2|mole|current|34|33–34|33–34|41–44|59|
|0|2|stoat|redesigned|34|33–34|33–34|37–39|55|
|0|2|squirrel|current|34|33–34|33–34|38–38|31|
|0|2|flyingsquirrel|redesigned|34|33–34|34–34|39–39|52|
|0|3|hedgehog|current|35|34–35|34–35|41–42|49|
|0|3|meerkat|redesigned|35|34–35|34–35|40–40|45|
|0|3|fennec|redesigned|35|34–35|35–35|39–40|29|
|0|3|marten|redesigned|35|34–35|35–35|40–40|61|
|0|3|owl|current|35|34–35|34–35|40–41|37|
|0|3|raven|current|35|34–35|34–35|41–41|43|
|0|3|heron|current|35|34–35|34–35|40–44|34|
|0|3|rattlesnake|current|35|34–35|34–35|42–47|118|
|0|3|bat|redesigned|35|34–35|34–35|37–41|53|
|0|4|cat|current|35|35–35|35–35|39–41|33|
|0|4|arcticfox|redesigned|35|35–35|35–35|40–40|41|
|0|4|hare|current|35|35–35|35–35|40–42|29|
|0|4|armadillo|current|35|35–35|35–35|41–42|59|
|0|5|fox|current|36|36–36|36–36|40–43|30|
|0|5|badger|redesigned|36|36–36|36–36|41–41|48|
|0|5|otter|redesigned|36|36–36|36–36|41–41|49|
|0|5|raccoon|redesigned|36|36–36|36–36|41–41|54|
|0|5|redpanda|current|36|36–36|36–36|41–41|64|
|0|6|lynx|current|37|36–37|36–37|41–42|31|
|0|6|beaver|current|37|36–37|37–37|42–42|45|
|0|6|roe|current|37|36–37|36–37|41–42|32|
|0|6|penguin|current|37|36–37|36–37|43–44|36|
|0|6|snake|current|37|36–37|36–37|43–47|109|
|0|7|wolf|redesigned|38|37–38|37–38|43–44|37|
|0|7|cheetah|current|38|37–38|37–38|43–43|53|
|0|7|snowleopard|current|38|37–38|38–38|43–43|56|
|0|7|jaguar|redesigned|38|37–38|38–38|43–43|50|
|0|7|ibex|current|38|37–38|37–38|41–45|35|
|0|7|ram|current|38|37–38|37–38|41–44|34|
|0|7|boar|current|38|37–38|37–38|43–44|47|
|0|7|komodo|current|38|37–38|37–38|42–43|113|
|0|8|tiger|current|39|38–39|39–39|44–44|48|
|0|8|lion|current|39|38–39|38–39|44–44|49|
|0|8|stag|current|39|38–39|38–39|44–45|41|
|0|8|sphinx *|current|39|38–39|39–39|44–44|55|
|0|8|griffin *|current|39|38–39|38–39|44–45|40|
|0|9|bear|redesigned|39|39–39|39–39|44–44|49|
|0|9|polarbear|current|39|39–39|39–39|43–45|54|
|0|9|elk|current|39|39–39|39–39|44–45|49|
|0|9|crocodile|redesigned|39|39–39|39–39|43–44|115|
|0|9|unicorn *|current|39|39–39|39–39|43–45|48|
|0|9|featheredserpent *|current|39|39–39|39–39|45–49|116|
|0|10|rhino|current|41|40–41|40–41|45–47|55|
|0|10|frosttroll *|redesigned|41|40–41|40–40|46–47|40|
|0|10|hydra *|redesigned|41|40–41|40–41|46–50|79|
|0|10|frostwyrm *|current|41|40–41|40–41|44–46|47|
|0|11|elephant|current|52|51–52|52–52|57–57|69|
|0|11|stegosaurus *|current|52|51–52|51–52|57–58|88|
|1|0|woodlouse|redesigned|47|47–47|47–47|54–58|109|
|1|0|snail|current|47|47–47|47–47|55–55|91|
|1|0|moth|current|47|47–47|47–47|51–54|85|
|1|0|dragonfly|redesigned|47|47–47|47–47|53–53|73|
|1|0|beetle|current|47|47–47|47–47|54–56|106|
|1|0|scorpion|current|47|47–47|47–47|54–57|84|
|1|1|newt|current|49|48–49|48–49|54–54|102|
|1|1|salamander|current|49|48–49|48–49|54–56|112|
|1|1|dormouse|redesigned|49|48–49|48–49|54–56|85|
|1|1|toad|current|49|48–49|48–48|56–59|80|
|1|1|crab|redesigned|49|48–49|48–48|57–57|104|
|1|1|spider|current|49|48–49|48–49|55–57|77|
|1|2|mole|current|50|49–50|50–50|60–62|104|
|1|2|stoat|redesigned|50|49–50|49–49|55–55|71|
|1|2|squirrel|current|50|49–50|49–50|54–56|53|
|1|2|flyingsquirrel|redesigned|50|49–50|49–50|55–57|87|
|1|3|hedgehog|current|52|51–52|51–52|61–63|84|
|1|3|meerkat|redesigned|52|51–52|51–52|58–59|71|
|1|3|fennec|redesigned|52|51–52|51–52|57–59|81|
|1|3|marten|redesigned|52|51–52|51–52|57–58|95|
|1|3|owl|current|52|51–52|51–52|57–59|44|
|1|3|raven|current|52|51–52|51–51|59–62|84|
|1|3|heron|current|52|51–52|51–52|58–62|43|
|1|3|rattlesnake|current|52|51–52|51–52|62–64|144|
|1|3|bat|redesigned|52|51–52|51–52|54–59|79|
|1|4|cat|current|54|53–54|53–54|59–61|67|
|1|4|arcticfox|redesigned|54|53–54|53–54|59–61|90|
|1|4|hare|current|54|53–54|53–54|58–63|51|
|1|4|armadillo|current|54|53–54|53–54|64–65|106|
|1|5|fox|current|55|54–55|55–55|60–62|108|
|1|5|badger|redesigned|55|54–55|54–55|60–62|87|
|1|5|otter|redesigned|55|54–55|55–55|60–62|127|
|1|5|raccoon|redesigned|55|54–55|54–55|60–62|96|
|1|5|redpanda|current|55|54–55|54–55|62–62|106|
|1|6|lynx|current|57|56–57|56–57|62–65|65|
|1|6|beaver|current|57|56–57|56–57|64–64|111|
|1|6|roe|current|57|56–57|56–57|62–65|70|
|1|6|penguin|current|57|56–57|56–56|64–64|44|
|1|6|snake|current|57|56–57|57–57|66–74|190|
|1|7|wolf|redesigned|58|57–58|58–58|64–66|107|
|1|7|cheetah|current|58|57–58|57–57|63–65|99|
|1|7|snowleopard|current|58|57–58|58–58|64–65|115|
|1|7|jaguar|redesigned|58|57–58|57–58|63–66|128|
|1|7|ibex|current|58|57–58|57–58|63–65|73|
|1|7|ram|current|58|57–58|57–58|63–65|82|
|1|7|boar|current|58|57–58|57–58|63–65|91|
|1|7|komodo|current|58|57–58|58–58|63–65|181|
|1|8|tiger|current|60|59–60|59–60|67–67|127|
|1|8|lion|current|60|59–60|59–60|66–69|124|
|1|8|stag|current|60|59–60|59–60|65–66|53|
|1|8|sphinx *|current|60|59–60|59–60|67–68|120|
|1|8|griffin *|current|60|59–60|59–60|65–67|82|
|1|9|bear|redesigned|61|60–61|60–61|68–69|97|
|1|9|polarbear|current|61|60–61|60–61|67–68|102|
|1|9|elk|current|61|60–61|61–61|67–68|88|
|1|9|crocodile|redesigned|61|60–61|61–61|66–66|194|
|1|9|unicorn *|current|61|60–61|60–61|66–67|97|
|1|9|featheredserpent *|current|61|60–61|60–61|67–74|167|
|1|10|rhino|current|63|62–63|62–63|68–71|115|
|1|10|frosttroll *|redesigned|63|62–63|63–63|71–72|60|
|1|10|hydra *|redesigned|63|62–63|62–63|70–74|127|
|1|10|frostwyrm *|current|63|62–63|62–63|68–69|123|
|1|11|elephant|current|65|64–65|65–65|71–72|103|
|1|11|stegosaurus *|current|65|64–65|65–65|72–73|141|
|2|0|woodlouse|redesigned|77|77–77|77–77|84–84|182|
|2|0|snail|current|77|77–77|77–77|85–87|114|
|2|0|moth|current|77|77–77|77–77|81–81|124|
|2|0|dragonfly|redesigned|77|77–77|77–77|84–84|122|
|2|0|beetle|current|77|77–77|77–77|82–82|169|
|2|0|scorpion|current|77|77–77|77–77|86–86|128|
|2|1|newt|current|82|81–82|81–82|88–90|154|
|2|1|salamander|current|82|81–82|82–82|89–89|165|
|2|1|dormouse|redesigned|82|81–82|81–82|90–92|133|
|2|1|toad|current|82|81–82|81–81|85–85|120|
|2|1|crab|redesigned|82|81–82|81–81|85–85|170|
|2|1|spider|current|82|81–82|81–81|86–86|116|
|2|2|mole|current|87|86–87|86–86|90–90|166|
|2|2|stoat|redesigned|87|86–87|87–87|94–95|149|
|2|2|squirrel|current|87|86–87|86–87|92–94|86|
|2|2|flyingsquirrel|redesigned|87|86–87|86–87|96–97|157|
|2|3|hedgehog|current|91|90–91|91–91|102–102|126|
|2|3|meerkat|redesigned|91|90–91|90–91|99–100|130|
|2|3|fennec|redesigned|91|90–91|90–91|97–100|126|
|2|3|marten|redesigned|91|90–91|90–91|99–101|186|
|2|3|owl|current|91|90–91|90–90|94–94|62|
|2|3|raven|current|91|90–91|90–91|103–108|167|
|2|3|heron|current|91|90–91|90–91|99–106|70|
|2|3|rattlesnake|current|91|90–91|91–91|105–108|202|
|2|3|bat|redesigned|91|90–91|90–91|94–102|131|
|2|4|cat|current|96|95–96|95–96|102–104|118|
|2|4|arcticfox|redesigned|96|95–96|95–96|105–105|172|
|2|4|hare|current|96|95–96|95–96|103–104|80|
|2|4|armadillo|current|96|95–96|95–95|103–103|188|
|2|5|fox|current|101|100–101|100–101|108–109|158|
|2|5|badger|redesigned|101|100–101|100–101|108–109|177|
|2|5|otter|redesigned|101|100–101|100–101|108–111|231|
|2|5|raccoon|redesigned|101|100–101|100–101|110–111|180|
|2|5|redpanda|current|101|100–101|100–101|109–111|190|
|2|6|lynx|current|106|105–106|105–106|113–116|117|
|2|6|beaver|current|106|105–106|105–106|116–119|197|
|2|6|roe|current|106|105–106|105–106|114–116|117|
|2|6|penguin|current|106|105–106|105–106|118–119|75|
|2|6|snake|current|106|105–106|105–106|119–128|267|
|2|7|wolf|redesigned|110|109–110|109–110|118–119|176|
|2|7|cheetah|current|110|109–110|109–110|119–120|196|
|2|7|snowleopard|current|110|109–110|110–110|120–120|212|
|2|7|jaguar|redesigned|110|109–110|109–110|120–124|227|
|2|7|ibex|current|110|109–110|109–110|116–118|113|
|2|7|ram|current|110|109–110|110–110|118–119|127|
|2|7|boar|current|110|109–110|109–110|119–121|178|
|2|7|komodo|current|110|109–110|109–110|116–120|339|
|2|8|tiger|current|115|114–115|114–115|125–127|231|
|2|8|lion|current|115|114–115|114–115|126–127|217|
|2|8|stag|current|115|114–115|115–115|122–123|88|
|2|8|sphinx *|current|115|114–115|114–115|124–126|181|
|2|8|griffin *|current|115|114–115|115–115|123–125|145|
|2|9|bear|redesigned|120|119–120|119–120|131–132|177|
|2|9|polarbear|current|120|119–120|119–120|131–132|202|
|2|9|elk|current|120|119–120|119–120|129–131|158|
|2|9|crocodile|redesigned|120|119–120|119–120|126–128|378|
|2|9|unicorn *|current|120|119–120|119–120|127–131|181|
|2|9|featheredserpent *|current|120|119–120|119–120|132–141|287|
|2|10|rhino|current|124|123–124|123–124|133–135|217|
|2|10|frosttroll *|redesigned|124|123–124|123–123|129–129|115|
|2|10|hydra *|redesigned|124|123–124|123–123|136–141|239|
|2|10|frostwyrm *|current|124|123–124|124–124|131–133|220|
|2|11|elephant|current|129|128–129|128–129|138–139|204|
|2|11|stegosaurus *|current|129|128–129|128–129|139–140|261|
|3|0|woodlouse|redesigned|135|135–136|135–135|146–146|303|
|3|0|snail|current|135|135–136|135–136|150–151|202|
|3|0|moth|current|135|135–136|136–136|142–142|222|
|3|0|dragonfly|redesigned|135|135–136|135–135|146–146|242|
|3|0|beetle|current|135|135–136|135–135|142–142|170|
|3|0|scorpion|current|135|135–136|135–136|148–150|163|
|3|1|newt|current|144|144–145|144–144|167–174|276|
|3|1|salamander|current|144|144–145|145–145|149–149|210|
|3|1|dormouse|redesigned|144|144–145|144–145|156–156|179|
|3|1|toad|current|144|144–145|145–145|151–151|221|
|3|1|crab|redesigned|144|144–145|145–145|151–151|350|
|3|1|spider|current|144|144–145|145–145|152–152|145|
|3|2|mole|current|153|153–154|154–154|160–160|269|
|3|2|stoat|redesigned|153|153–154|154–154|157–157|256|
|3|2|squirrel|current|153|153–154|153–153|161–163|120|
|3|2|flyingsquirrel|redesigned|153|153–154|154–154|168–168|283|
|3|3|hedgehog|current|160|160–161|161–161|177–177|268|
|3|3|meerkat|redesigned|160|160–161|161–161|166–166|217|
|3|3|fennec|redesigned|160|160–161|160–161|170–174|250|
|3|3|marten|redesigned|160|160–161|160–161|172–178|340|
|3|3|owl|current|160|160–161|161–161|167–167|186|
|3|3|raven|current|160|160–161|160–161|176–183|250|
|3|3|heron|current|160|160–161|160–160|172–183|110|
|3|3|rattlesnake|current|160|160–161|160–161|177–178|167|
|3|3|bat|redesigned|160|160–161|161–161|168–168|156|
|3|4|cat|current|168|168–169|168–168|169–169|195|
|3|4|arcticfox|redesigned|168|168–169|168–169|179–183|308|
|3|4|hare|current|168|168–169|168–169|177–181|112|
|3|4|armadillo|current|168|168–169|168–168|181–181|187|
|3|5|fox|current|177|177–178|177–177|178–178|239|
|3|5|badger|redesigned|177|177–178|177–177|189–194|274|
|3|5|otter|redesigned|177|177–178|178–178|181–181|373|
|3|5|raccoon|redesigned|177|177–178|178–178|183–183|306|
|3|5|redpanda|current|177|177–178|177–177|191–191|336|
|3|6|lynx|current|186|186–187|186–187|197–199|153|
|3|6|beaver|current|186|186–187|186–186|204–207|368|
|3|6|roe|current|186|186–187|186–186|187–187|142|
|3|6|penguin|current|186|186–187|187–187|191–191|139|
|3|6|snake|current|186|186–187|186–186|205–216|673|
|3|7|wolf|redesigned|193|193–194|193–194|206–212|349|
|3|7|cheetah|current|193|193–194|193–193|199–199|291|
|3|7|snowleopard|current|193|193–194|193–193|199–200|275|
|3|7|jaguar|redesigned|193|193–194|193–194|208–213|425|
|3|7|ibex|current|193|193–194|193–194|204–204|166|
|3|7|ram|current|193|193–194|193–193|194–194|202|
|3|7|boar|current|193|193–194|193–194|205–208|246|
|3|7|komodo|current|193|193–194|193–194|204–208|574|
|3|8|tiger|current|202|202–203|203–203|207–207|390|
|3|8|lion|current|202|202–203|202–203|216–226|305|
|3|8|stag|current|202|202–203|202–203|214–215|197|
|3|8|sphinx *|current|202|202–203|202–202|213–215|234|
|3|8|griffin *|current|202|202–203|203–203|209–209|224|
|3|9|bear|redesigned|210|210–211|210–210|226–231|303|
|3|9|polarbear|current|210|210–211|210–211|225–230|334|
|3|9|elk|current|210|210–211|210–210|211–211|208|
|3|9|crocodile|redesigned|210|210–211|210–210|220–222|668|
|3|9|unicorn *|current|210|210–211|211–211|217–217|279|
|3|9|featheredserpent *|current|210|210–211|211–211|228–228|366|
|3|10|rhino|current|217|217–218|218–218|222–222|363|
|3|10|frosttroll *|redesigned|217|217–218|218–218|221–221|182|
|3|10|hydra *|redesigned|217|217–218|217–217|236–237|330|
|3|10|frostwyrm *|current|217|217–218|217–217|228–231|479|
|3|11|elephant|current|226|226–227|226–227|237–244|435|
|3|11|stegosaurus *|current|226|226–227|227–227|235–235|407|

## Actual native pixel ties

- Age 0, towards, frame 0, 32px: woodlouse, snail, moth, dragonfly, beetle, scorpion, crab
- Age 0, towards, frame 1, 32px: woodlouse, snail, moth, dragonfly, beetle, scorpion, toad, crab
- Age 1, towards, frame 0, 47px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 1, towards, frame 1, 47px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 2, towards, frame 0, 77px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 2, towards, frame 1, 77px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 3, towards, frame 0, 135px: woodlouse, snail, dragonfly, beetle, scorpion
- Age 3, towards, frame 1, 135px: woodlouse, snail, dragonfly, beetle, scorpion
- Age 0, away, frame 0, 32px: woodlouse, snail, moth, dragonfly, beetle, scorpion, toad, crab, spider
- Age 0, away, frame 1, 32px: woodlouse, snail, moth, dragonfly, beetle, scorpion, toad, crab, spider
- Age 1, away, frame 0, 47px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 1, away, frame 1, 47px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 2, away, frame 0, 77px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 2, away, frame 1, 77px: woodlouse, snail, moth, dragonfly, beetle, scorpion
- Age 3, away, frame 0, 135px: woodlouse, dragonfly, beetle
- Age 3, away, frame 1, 135px: woodlouse, dragonfly, beetle
- Age 3, away, frame 0, 136px: snail, moth, scorpion
- Age 3, away, frame 1, 136px: snail, moth, scorpion
- Age 0, towards, frame 0, 33px: newt, salamander, dormouse, toad, spider
- Age 0, towards, frame 1, 33px: newt, salamander, dormouse, spider, squirrel
- Age 1, towards, frame 0, 48px: newt, salamander, toad, crab, spider
- Age 1, towards, frame 1, 48px: newt, toad, crab
- Age 2, towards, frame 0, 81px: newt, toad, crab, spider
- Age 2, towards, frame 1, 82px: newt, salamander, dormouse
- Age 3, towards, frame 0, 144px: newt, dormouse
- Age 3, towards, frame 1, 144px: newt, dormouse
- Age 0, away, frame 0, 33px: newt, salamander, dormouse, mole, stoat, squirrel
- Age 0, away, frame 1, 33px: newt, salamander, dormouse, stoat, squirrel
- Age 1, away, frame 0, 49px: newt, salamander, dormouse, stoat, flyingsquirrel
- Age 1, away, frame 1, 49px: newt, salamander, stoat, flyingsquirrel
- Age 2, away, frame 0, 81px: newt, dormouse, toad, crab, spider
- Age 2, away, frame 1, 81px: newt, dormouse, toad, crab, spider
- Age 1, towards, frame 1, 49px: salamander, dormouse, spider, stoat, flyingsquirrel
- Age 2, towards, frame 0, 82px: salamander, dormouse
- Age 3, towards, frame 0, 145px: salamander, toad, crab, spider
- Age 3, towards, frame 1, 145px: salamander, toad, crab, spider
- Age 3, away, frame 0, 145px: salamander, dormouse, toad, crab, spider
- Age 3, away, frame 1, 145px: salamander, dormouse, toad, crab, spider
- Age 1, towards, frame 0, 49px: dormouse, stoat, squirrel
- Age 1, away, frame 1, 48px: dormouse, toad, crab, spider
- Age 2, towards, frame 1, 81px: toad, crab, spider
- Age 1, away, frame 0, 48px: toad, crab, spider
- Age 0, towards, frame 0, 34px: mole, stoat, squirrel, flyingsquirrel, meerkat, raven, heron
- Age 0, towards, frame 1, 34px: mole, stoat, flyingsquirrel, meerkat, owl, raven, rattlesnake
- Age 1, towards, frame 0, 50px: mole, flyingsquirrel
- Age 1, towards, frame 1, 50px: mole, squirrel
- Age 2, towards, frame 0, 86px: mole, squirrel
- Age 2, towards, frame 1, 86px: mole, flyingsquirrel
- Age 3, towards, frame 0, 154px: mole, stoat, flyingsquirrel
- Age 3, towards, frame 1, 154px: mole, stoat, flyingsquirrel
- Age 0, away, frame 1, 34px: mole, flyingsquirrel
- Age 1, away, frame 0, 50px: mole, squirrel
- Age 1, away, frame 1, 50px: mole, squirrel
- Age 2, away, frame 0, 86px: mole, squirrel, flyingsquirrel
- Age 3, away, frame 0, 154px: mole, stoat, flyingsquirrel
- Age 3, away, frame 1, 154px: mole, stoat, flyingsquirrel
- Age 2, towards, frame 0, 87px: stoat, flyingsquirrel
- Age 2, towards, frame 1, 87px: stoat, squirrel
- Age 2, away, frame 1, 87px: stoat, squirrel, flyingsquirrel
- Age 0, away, frame 0, 34px: flyingsquirrel, hedgehog, raven, rattlesnake, bat
- Age 0, towards, frame 0, 35px: hedgehog, fennec, marten, owl, rattlesnake, bat, cat, arcticfox, hare, armadillo
- Age 0, towards, frame 1, 35px: hedgehog, fennec, marten, heron, bat, cat, arcticfox, hare, armadillo
- Age 1, towards, frame 0, 51px: hedgehog, meerkat, owl, raven, rattlesnake
- Age 1, towards, frame 1, 51px: hedgehog, meerkat, fennec, marten, owl, raven, heron, rattlesnake
- Age 2, towards, frame 0, 91px: hedgehog, marten, raven, heron, rattlesnake
- Age 2, towards, frame 1, 91px: hedgehog, meerkat, fennec, marten, raven, heron, rattlesnake
- Age 3, towards, frame 0, 161px: hedgehog, meerkat, fennec, marten, owl, raven, bat
- Age 3, towards, frame 1, 161px: hedgehog, meerkat, fennec, owl, bat
- Age 0, away, frame 1, 35px: hedgehog, meerkat, fennec, marten, owl, raven, heron, rattlesnake, bat, cat, arcticfox, hare, armadillo
- Age 1, away, frame 0, 52px: hedgehog, fennec, marten, owl, heron, rattlesnake, bat
- Age 1, away, frame 1, 51px: hedgehog, marten, owl, raven, heron, bat
- Age 2, away, frame 0, 91px: hedgehog, meerkat, fennec, raven, rattlesnake
- Age 2, away, frame 1, 91px: hedgehog, fennec, marten, heron, rattlesnake, bat
- Age 3, away, frame 0, 161px: hedgehog, meerkat, fennec, owl, rattlesnake, bat
- Age 3, away, frame 1, 161px: hedgehog, meerkat, owl, rattlesnake, bat
- Age 2, towards, frame 0, 90px: meerkat, fennec, owl, bat
- Age 0, away, frame 0, 35px: meerkat, fennec, marten, owl, heron, cat, arcticfox, hare, armadillo
- Age 1, away, frame 0, 51px: meerkat, raven
- Age 1, away, frame 1, 52px: meerkat, fennec, rattlesnake
- Age 2, away, frame 1, 90px: meerkat, owl, raven
- Age 1, towards, frame 0, 52px: fennec, marten, heron, bat
- Age 3, away, frame 1, 160px: fennec, marten, raven, heron
- Age 3, towards, frame 1, 160px: marten, raven, heron, rattlesnake
- Age 2, away, frame 0, 90px: marten, owl, heron, bat
- Age 3, away, frame 0, 160px: marten, raven, heron
- Age 2, towards, frame 1, 90px: owl, bat
- Age 3, towards, frame 0, 160px: heron, rattlesnake
- Age 1, towards, frame 1, 54px: cat, arcticfox, hare, armadillo, raccoon
- Age 2, towards, frame 0, 96px: cat, arcticfox
- Age 2, towards, frame 1, 96px: cat, arcticfox, hare
- Age 3, towards, frame 0, 168px: cat, arcticfox, armadillo
- Age 3, towards, frame 1, 168px: cat, arcticfox, hare, armadillo
- Age 1, away, frame 0, 54px: cat, hare, armadillo, raccoon, redpanda
- Age 1, away, frame 1, 54px: cat, arcticfox, badger, redpanda
- Age 2, away, frame 0, 95px: cat, hare, armadillo
- Age 3, away, frame 0, 168px: cat, hare, armadillo
- Age 3, away, frame 1, 168px: cat, arcticfox, hare, armadillo
- Age 1, towards, frame 0, 54px: arcticfox, hare, armadillo
- Age 2, away, frame 1, 95px: arcticfox, hare, armadillo
- Age 2, towards, frame 0, 95px: hare, armadillo
- Age 1, away, frame 1, 53px: hare, armadillo
- Age 0, towards, frame 0, 36px: fox, badger, otter, raccoon, redpanda, roe
- Age 0, towards, frame 1, 36px: fox, badger, otter, raccoon, redpanda, roe, snake
- Age 1, towards, frame 0, 55px: fox, badger, otter, raccoon, redpanda
- Age 1, towards, frame 1, 55px: fox, badger, otter, redpanda
- Age 2, towards, frame 1, 100px: fox, badger, raccoon, redpanda
- Age 3, towards, frame 0, 177px: fox, badger, redpanda
- Age 3, towards, frame 1, 177px: fox, badger, redpanda
- Age 0, away, frame 0, 36px: fox, badger, otter, raccoon, redpanda, lynx
- Age 0, away, frame 1, 36px: fox, badger, otter, raccoon, redpanda, lynx, roe, penguin
- Age 1, away, frame 0, 55px: fox, badger, otter
- Age 1, away, frame 1, 55px: fox, otter, raccoon
- Age 2, away, frame 0, 100px: fox, otter
- Age 2, away, frame 1, 101px: fox, badger, otter, raccoon
- Age 3, away, frame 0, 177px: fox, badger, redpanda
- Age 3, away, frame 1, 177px: fox, badger, redpanda
- Age 2, towards, frame 0, 101px: badger, otter, raccoon, redpanda
- Age 2, away, frame 0, 101px: badger, raccoon, redpanda
- Age 3, towards, frame 0, 178px: otter, raccoon
- Age 3, towards, frame 1, 178px: otter, raccoon
- Age 3, away, frame 0, 178px: otter, raccoon
- Age 3, away, frame 1, 178px: otter, raccoon
- Age 0, towards, frame 0, 37px: lynx, beaver, penguin, snake, ibex, ram, boar
- Age 0, towards, frame 1, 37px: lynx, beaver, penguin, wolf, cheetah, ram, boar, komodo
- Age 1, towards, frame 0, 57px: lynx, snake, cheetah, jaguar, ibex
- Age 1, towards, frame 1, 56px: lynx, beaver, penguin
- Age 2, towards, frame 0, 105px: lynx, penguin, snake
- Age 2, towards, frame 1, 106px: lynx, beaver, roe, penguin, snake
- Age 3, towards, frame 0, 186px: lynx, beaver, roe, snake
- Age 3, towards, frame 1, 187px: lynx, penguin
- Age 1, away, frame 0, 57px: lynx, beaver, roe, snake, cheetah, jaguar, boar
- Age 1, away, frame 1, 56px: lynx, roe, penguin
- Age 2, away, frame 0, 106px: lynx, beaver, roe
- Age 2, away, frame 1, 105px: lynx, beaver, roe, penguin
- Age 3, away, frame 0, 186px: lynx, beaver, roe, snake
- Age 3, away, frame 1, 186px: lynx, beaver, roe, snake
- Age 1, towards, frame 0, 56px: beaver, roe, penguin
- Age 2, towards, frame 0, 106px: beaver, roe
- Age 3, towards, frame 1, 186px: beaver, roe, snake
- Age 0, away, frame 0, 37px: beaver, roe, penguin, snake, ibex, boar
- Age 0, away, frame 1, 37px: beaver, snake, ibex, ram
- Age 1, away, frame 1, 57px: beaver, snake, cheetah, ram
- Age 1, towards, frame 1, 57px: roe, snake, cheetah
- Age 2, away, frame 0, 105px: penguin, snake
- Age 0, towards, frame 0, 38px: wolf, cheetah, snowleopard, jaguar, komodo, stag, griffin
- Age 1, towards, frame 0, 58px: wolf, snowleopard, ram, boar, komodo
- Age 1, towards, frame 1, 58px: wolf, snowleopard, jaguar, ibex, ram, boar, komodo
- Age 2, towards, frame 0, 110px: wolf, snowleopard, ibex, ram, boar, komodo
- Age 2, towards, frame 1, 109px: wolf, boar
- Age 3, towards, frame 0, 193px: wolf, cheetah, snowleopard, jaguar, ibex, ram, boar, komodo
- Age 3, towards, frame 1, 194px: wolf, jaguar, boar, komodo
- Age 0, away, frame 0, 38px: wolf, cheetah, snowleopard, jaguar, ram, komodo
- Age 0, away, frame 1, 38px: wolf, cheetah, snowleopard, jaguar, boar, komodo
- Age 1, away, frame 0, 58px: wolf, snowleopard, ibex, ram, komodo
- Age 1, away, frame 1, 58px: wolf, snowleopard, jaguar, ibex, boar, komodo
- Age 2, away, frame 0, 110px: wolf, snowleopard, jaguar, ram, boar
- Age 2, away, frame 1, 110px: wolf, cheetah, snowleopard, jaguar, ibex, ram
- Age 3, away, frame 0, 193px: wolf, cheetah, snowleopard, jaguar, ram, boar, komodo
- Age 3, away, frame 1, 193px: wolf, cheetah, snowleopard, jaguar, ibex, ram, boar, komodo
- Age 2, towards, frame 0, 109px: cheetah, jaguar
- Age 2, towards, frame 1, 110px: cheetah, snowleopard, jaguar, ibex, ram, komodo
- Age 3, towards, frame 1, 193px: cheetah, snowleopard, ibex, ram
- Age 2, away, frame 0, 109px: cheetah, ibex, komodo
- Age 0, towards, frame 1, 38px: snowleopard, jaguar, ibex, lion, stag
- Age 2, away, frame 1, 109px: boar, komodo
- Age 0, towards, frame 0, 39px: tiger, lion, sphinx, bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age 0, towards, frame 1, 39px: tiger, sphinx, griffin, bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age 1, towards, frame 0, 59px: tiger, lion, stag, griffin
- Age 1, towards, frame 1, 59px: tiger, sphinx
- Age 2, towards, frame 0, 115px: tiger, stag, griffin
- Age 2, towards, frame 1, 114px: tiger, lion
- Age 3, towards, frame 0, 203px: tiger, lion, stag, griffin
- Age 3, towards, frame 1, 203px: tiger, lion, griffin
- Age 0, away, frame 0, 39px: tiger, lion, stag, sphinx, griffin, bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age 0, away, frame 1, 39px: tiger, lion, stag, sphinx, griffin, bear, polarbear, elk, crocodile, unicorn, featheredserpent
- Age 1, away, frame 0, 60px: tiger, lion, stag, sphinx, polarbear, featheredserpent
- Age 1, away, frame 1, 60px: tiger, stag, sphinx, griffin, bear, unicorn, featheredserpent
- Age 2, away, frame 0, 115px: tiger, lion, stag, sphinx, griffin
- Age 3, away, frame 0, 203px: tiger, lion, griffin
- Age 3, away, frame 1, 203px: tiger, griffin
- Age 1, towards, frame 1, 60px: lion, stag, griffin, bear, polarbear
- Age 2, towards, frame 0, 114px: lion, sphinx
- Age 2, away, frame 1, 115px: lion, stag, sphinx, griffin
- Age 3, away, frame 1, 202px: lion, stag, sphinx
- Age 2, towards, frame 1, 115px: stag, sphinx, griffin
- Age 3, towards, frame 1, 202px: stag, sphinx
- Age 3, away, frame 0, 202px: stag, sphinx
- Age 1, towards, frame 0, 60px: sphinx, polarbear, unicorn
- Age 1, towards, frame 0, 61px: bear, elk, crocodile, featheredserpent
- Age 2, towards, frame 0, 119px: bear, polarbear
- Age 2, towards, frame 1, 119px: bear, featheredserpent
- Age 3, towards, frame 0, 210px: bear, polarbear, elk, crocodile
- Age 3, towards, frame 1, 210px: bear, polarbear, elk, crocodile
- Age 1, away, frame 0, 61px: bear, elk, crocodile, unicorn
- Age 2, away, frame 0, 120px: bear, elk, unicorn
- Age 2, away, frame 1, 120px: bear, polarbear, crocodile, featheredserpent
- Age 3, away, frame 0, 210px: bear, elk, crocodile
- Age 3, away, frame 1, 210px: bear, polarbear, elk, crocodile
- Age 2, towards, frame 1, 120px: polarbear, elk, crocodile, unicorn
- Age 1, away, frame 1, 61px: polarbear, elk, crocodile
- Age 2, away, frame 0, 119px: polarbear, crocodile, featheredserpent
- Age 3, away, frame 0, 211px: polarbear, unicorn, featheredserpent
- Age 1, towards, frame 1, 61px: elk, crocodile, unicorn, featheredserpent
- Age 2, towards, frame 0, 120px: elk, crocodile, unicorn, featheredserpent
- Age 2, away, frame 1, 119px: elk, unicorn
- Age 3, towards, frame 0, 211px: unicorn, featheredserpent
- Age 3, towards, frame 1, 211px: unicorn, featheredserpent
- Age 3, away, frame 1, 211px: unicorn, featheredserpent
- Age 0, towards, frame 0, 41px: rhino, hydra, frostwyrm
- Age 0, towards, frame 1, 40px: rhino, frosttroll
- Age 1, towards, frame 0, 62px: rhino, hydra
- Age 1, towards, frame 1, 63px: rhino, frosttroll, hydra
- Age 2, towards, frame 0, 123px: rhino, frosttroll, hydra
- Age 2, towards, frame 1, 123px: rhino, frosttroll, hydra
- Age 3, towards, frame 0, 218px: rhino, frosttroll
- Age 3, towards, frame 1, 218px: rhino, frosttroll
- Age 0, away, frame 0, 40px: rhino, frosttroll, hydra
- Age 1, away, frame 1, 63px: rhino, frosttroll, hydra, frostwyrm
- Age 2, away, frame 0, 124px: rhino, frostwyrm
- Age 2, away, frame 1, 123px: rhino, frosttroll, hydra
- Age 3, away, frame 0, 218px: rhino, frosttroll
- Age 3, away, frame 1, 218px: rhino, frosttroll
- Age 1, towards, frame 0, 63px: frosttroll, frostwyrm
- Age 0, away, frame 1, 40px: frosttroll, hydra, frostwyrm
- Age 1, away, frame 0, 63px: frosttroll, hydra, frostwyrm
- Age 2, away, frame 0, 123px: frosttroll, hydra
- Age 0, towards, frame 1, 41px: hydra, frostwyrm
- Age 3, towards, frame 0, 217px: hydra, frostwyrm
- Age 3, towards, frame 1, 217px: hydra, frostwyrm
- Age 3, away, frame 0, 217px: hydra, frostwyrm
- Age 3, away, frame 1, 217px: hydra, frostwyrm
- Age 0, towards, frame 0, 52px: elephant, stegosaurus
- Age 1, towards, frame 0, 65px: elephant, stegosaurus
- Age 1, towards, frame 1, 65px: elephant, stegosaurus
- Age 2, towards, frame 0, 129px: elephant, stegosaurus
- Age 3, towards, frame 0, 227px: elephant, stegosaurus
- Age 0, away, frame 0, 52px: elephant, stegosaurus
- Age 0, away, frame 1, 52px: elephant, stegosaurus
- Age 1, away, frame 0, 65px: elephant, stegosaurus
- Age 1, away, frame 1, 65px: elephant, stegosaurus
- Age 2, away, frame 0, 128px: elephant, stegosaurus
