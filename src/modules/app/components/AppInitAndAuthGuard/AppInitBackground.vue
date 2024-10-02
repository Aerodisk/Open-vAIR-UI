<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'AppInitBackground' })
</script>

<template>
  <div class="stars_background v-theme--darkBlue">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div class="w-100 h-screen d-flex flex-column align-center justify-center">
      <slot />
    </div>
  </div>
</template>

<style>
.formkit-form#login_form .formkit-outer .formkit-messages {
  display: none;
}
.stars_background {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  animation: animStar 50s linear infinite;
  box-shadow: 2658px 1065px #fff, 2715px 868px #fff, 1201px 2753px #fff, 3909px 1288px #fff, 3895px 2497px #fff,
    3844px 1864px #fff, 2219px 1032px #fff, 3611px 3624px #fff, 195px 3125px #fff, 2761px 549px #fff, 2138px 2032px #fff,
    108px 1621px #fff, 1478px 3839px #fff, 1002px 719px #fff, 3514px 64px #fff, 3143px 2445px #fff, 3937px 1343px #fff,
    1866px 249px #fff, 3058px 1326px #fff, 3393px 2426px #fff, 1518px 805px #fff, 3182px 2594px #fff, 2333px 1962px #fff,
    2967px 2092px #fff, 479px 1371px #fff, 785px 3606px #fff, 2380px 3890px #fff, 1599px 3364px #fff, 1140px 3925px #fff,
    2080px 204px #fff, 100px 2338px #fff, 443px 35px #fff, 3443px 3954px #fff, 1981px 331px #fff, 641px 614px #fff,
    3451px 894px #fff, 517px 1115px #fff, 752px 2410px #fff, 247px 3661px #fff, 1926px 337px #fff, 295px 516px #fff,
    1091px 386px #fff, 3275px 2750px #fff, 3034px 1839px #fff, 1207px 3376px #fff, 1121px 2459px #fff,
    1893px 2035px #fff, 1682px 3551px #fff, 210px 282px #fff, 3634px 3688px #fff, 3444px 3093px #fff, 1879px 3556px #fff,
    3358px 219px #fff, 2915px 626px #fff, 1866px 2252px #fff, 1453px 216px #fff, 2061px 3418px #fff, 3782px 2862px #fff,
    471px 1854px #fff, 185px 95px #fff, 538px 2672px #fff, 3969px 971px #fff, 3342px 718px #fff, 845px 2227px #fff,
    3057px 353px #fff, 3423px 3299px #fff, 1026px 2133px #fff, 2463px 946px #fff, 1120px 3919px #fff, 2344px 1619px #fff,
    1956px 2299px #fff, 2466px 3325px #fff, 683px 1357px #fff, 1445px 1303px #fff, 3046px 970px #fff, 2429px 1465px #fff,
    422px 1861px #fff, 2223px 2491px #fff, 3113px 3930px #fff, 3805px 277px #fff, 1089px 2924px #fff, 3966px 2106px #fff,
    1529px 3121px #fff, 2321px 717px #fff, 2048px 701px #fff, 652px 2161px #fff, 2347px 1269px #fff, 1905px 1445px #fff,
    3573px 3230px #fff, 3765px 869px #fff, 1105px 539px #fff, 356px 934px #fff, 918px 1998px #fff, 3161px 605px #fff,
    1167px 672px #fff, 3853px 3044px #fff, 2933px 3285px #fff, 2220px 1115px #fff, 531px 2790px #fff, 850px 3768px #fff,
    3883px 1758px #fff, 837px 588px #fff, 1628px 626px #fff, 1330px 799px #fff, 2621px 655px #fff, 1960px 2707px #fff,
    3532px 157px #fff, 1774px 3512px #fff, 3598px 364px #fff, 1252px 814px #fff, 340px 3949px #fff, 3429px 342px #fff,
    2254px 1730px #fff, 1436px 1843px #fff, 1288px 920px #fff, 3081px 1326px #fff, 1807px 3736px #fff, 782px 1784px #fff,
    353px 2056px #fff, 1938px 2803px #fff, 1485px 1514px #fff, 917px 3042px #fff, 1847px 2179px #fff, 245px 3187px #fff,
    2718px 3386px #fff, 3386px 2685px #fff, 594px 2903px #fff, 3858px 1247px #fff, 3579px 2813px #fff,
    1920px 3347px #fff, 3897px 2168px #fff, 3506px 2520px #fff, 1086px 1508px #fff, 2059px 3817px #fff,
    1944px 2830px #fff, 3691px 1213px #fff, 3694px 784px #fff, 3357px 3036px #fff, 2153px 262px #fff, 1348px 3179px #fff,
    1607px 933px #fff, 704px 1204px #fff, 2513px 1262px #fff, 2208px 2476px #fff, 1724px 578px #fff, 1006px 1028px #fff,
    1053px 2004px #fff, 2051px 2588px #fff, 2356px 419px #fff, 1353px 965px #fff, 1405px 3843px #fff, 2035px 2217px #fff,
    905px 2907px #fff, 772px 879px #fff, 2969px 74px #fff, 1340px 1094px #fff, 1043px 1489px #fff, 3551px 1814px #fff,
    1717px 1999px #fff, 1707px 3418px #fff, 3012px 1389px #fff, 3847px 1225px #fff, 1669px 1011px #fff,
    1210px 1998px #fff, 862px 1097px #fff, 2655px 3475px #fff, 1382px 3526px #fff, 2894px 1032px #fff,
    1642px 1829px #fff, 423px 149px #fff, 1948px 1927px #fff, 2760px 652px #fff, 2764px 569px #fff, 1919px 2782px #fff,
    3115px 3485px #fff, 2366px 2980px #fff, 2502px 2891px #fff, 405px 858px #fff, 1771px 233px #fff, 273px 3178px #fff,
    428px 55px #fff, 1941px 490px #fff, 1617px 2416px #fff, 2849px 2210px #fff, 973px 485px #fff, 2683px 1603px #fff,
    218px 1828px #fff, 515px 2900px #fff, 2669px 2195px #fff, 551px 3100px #fff, 983px 3541px #fff, 1657px 1694px #fff,
    1341px 2122px #fff, 3909px 1776px #fff, 1376px 1819px #fff, 3220px 3413px #fff, 2730px 417px #fff, 1231px 312px #fff,
    1022px 2611px #fff, 2146px 3177px #fff, 3709px 2257px #fff, 345px 188px #fff, 3721px 1877px #fff, 614px 657px #fff,
    1365px 1331px #fff, 2518px 2792px #fff, 1878px 3926px #fff, 1405px 3608px #fff, 1938px 2117px #fff, 7px 658px #fff,
    3423px 3141px #fff, 2115px 1511px #fff, 1720px 1737px #fff, 1985px 2886px #fff, 3565px 1281px #fff,
    3410px 2844px #fff, 3389px 3892px #fff, 3371px 2466px #fff, 2003px 3729px #fff, 1968px 127px #fff,
    3177px 2436px #fff, 2037px 930px #fff, 1526px 1172px #fff, 3154px 3254px #fff, 1053px 2774px #fff,
    3884px 1870px #fff, 3879px 3227px #fff, 821px 3832px #fff, 1177px 2876px #fff, 130px 1034px #fff, 3377px 108px #fff,
    2412px 3305px #fff, 1482px 813px #fff, 1624px 3876px #fff, 2356px 3876px #fff, 1486px 3885px #fff,
    2670px 3974px #fff, 2957px 3123px #fff, 1114px 3695px #fff, 1178px 3370px #fff, 106px 378px #fff, 606px 2267px #fff,
    2707px 484px #fff, 3869px 3187px #fff, 1597px 387px #fff, 3681px 219px #fff, 558px 700px #fff, 132px 652px #fff,
    1776px 1295px #fff, 1554px 1100px #fff, 2509px 2746px #fff, 2577px 1314px #fff, 1129px 204px #fff, 1480px 161px #fff,
    3496px 1561px #fff, 1171px 3954px #fff, 3323px 81px #fff, 2630px 827px #fff, 3015px 1809px #fff, 2195px 3374px #fff,
    1862px 32px #fff, 2911px 1123px #fff, 1810px 1813px #fff, 1600px 542px #fff, 3013px 1256px #fff, 1146px 3929px #fff,
    3329px 2px #fff, 2835px 3936px #fff, 2522px 1018px #fff, 1797px 524px #fff, 2112px 2765px #fff, 628px 2675px #fff,
    3521px 2095px #fff, 3379px 898px #fff, 944px 461px #fff, 2095px 3051px #fff, 2405px 2309px #fff, 3965px 1192px #fff,
    518px 1331px #fff, 2462px 610px #fff, 2493px 3146px #fff, 2950px 2364px #fff, 1705px 3699px #fff, 1141px 979px #fff,
    391px 1331px #fff, 2038px 2740px #fff, 3189px 2676px #fff, 3514px 1319px #fff, 2263px 3742px #fff,
    3632px 1645px #fff, 3213px 1119px #fff, 2768px 2376px #fff, 2589px 1051px #fff, 3248px 2996px #fff,
    3795px 1189px #fff, 133px 3857px #fff, 1735px 1445px #fff, 2839px 421px #fff, 959px 1149px #fff, 2757px 3698px #fff,
    1227px 3733px #fff, 2778px 1357px #fff, 2170px 1447px #fff, 2059px 671px #fff, 87px 2961px #fff, 1801px 2309px #fff,
    2903px 196px #fff, 931px 1354px #fff, 569px 957px #fff, 484px 3367px #fff, 1475px 2279px #fff, 3957px 625px #fff,
    1800px 2226px #fff, 3437px 2391px #fff, 505px 677px #fff, 3742px 2428px #fff, 1764px 1707px #fff, 3496px 3181px #fff,
    3881px 34px #fff, 3429px 3842px #fff, 1472px 2310px #fff, 3487px 754px #fff, 3223px 2342px #fff, 1306px 2195px #fff,
    2483px 2271px #fff, 3600px 37px #fff, 3285px 1984px #fff, 582px 2524px #fff, 2239px 1462px #fff, 2706px 2300px #fff,
    3017px 3553px #fff, 1885px 1221px #fff, 492px 3266px #fff, 1369px 3867px #fff, 2145px 3443px #fff, 2946px 194px #fff,
    1578px 3713px #fff, 600px 2027px #fff, 3551px 1899px #fff, 2877px 2915px #fff, 2597px 3357px #fff, 885px 3648px #fff,
    220px 2973px #fff, 3428px 598px #fff, 8px 1545px #fff, 3594px 3413px #fff, 3599px 2856px #fff, 841px 2247px #fff,
    2755px 3496px #fff, 2286px 1606px #fff, 1701px 1392px #fff, 2555px 3614px #fff, 1400px 59px #fff, 3103px 824px #fff,
    3924px 1122px #fff, 133px 1177px #fff, 1314px 1230px #fff, 941px 3829px #fff, 1170px 1119px #fff, 731px 2735px #fff,
    3358px 2816px #fff, 1898px 1206px #fff, 3334px 463px #fff, 2955px 1955px #fff, 776px 2338px #fff, 3604px 2659px #fff,
    924px 2029px #fff, 349px 2684px #fff, 2656px 2316px #fff, 2342px 1812px #fff, 1057px 404px #fff, 2700px 1156px #fff,
    2721px 2474px #fff, 1561px 2799px #fff, 470px 3192px #fff, 1776px 3559px #fff, 1510px 1336px #fff,
    2089px 1738px #fff, 3097px 2126px #fff, 1653px 3037px #fff, 3019px 86px #fff, 531px 3763px #fff, 2274px 3534px #fff,
    3328px 1523px #fff, 1279px 1511px #fff, 1127px 617px #fff, 3813px 3888px #fff, 3528px 455px #fff, 2202px 660px #fff,
    2690px 1437px #fff, 518px 3266px #fff, 339px 98px #fff, 1338px 1865px #fff, 3578px 435px #fff, 2000px 445px #fff,
    1518px 3076px #fff, 2449px 3476px #fff, 1929px 458px #fff, 379px 1186px #fff, 1751px 3223px #fff, 558px 1725px #fff,
    3548px 738px #fff, 1625px 2947px #fff, 57px 1877px #fff, 1352px 2394px #fff, 733px 495px #fff, 1125px 851px #fff,
    1007px 2357px #fff, 1480px 272px #fff, 609px 224px #fff, 1361px 3987px #fff, 556px 3112px #fff, 2587px 3020px #fff,
    953px 3803px #fff, 3189px 1882px #fff, 1024px 3381px #fff, 268px 290px #fff, 563px 2590px #fff, 2419px 3062px #fff,
    3164px 3452px #fff, 1783px 3737px #fff, 2316px 347px #fff, 1011px 158px #fff, 1314px 710px #fff, 1967px 2834px #fff,
    3604px 993px #fff, 234px 1074px #fff, 100px 3341px #fff, 1990px 3167px #fff, 405px 3980px #fff, 958px 253px #fff,
    324px 1050px #fff, 3565px 3750px #fff, 2079px 2864px #fff, 3541px 284px #fff, 3580px 14px #fff, 1718px 1306px #fff,
    1851px 763px #fff, 394px 2739px #fff, 2250px 3861px #fff, 1641px 3206px #fff, 2465px 1440px #fff, 3123px 3939px #fff,
    3107px 114px #fff, 3863px 301px #fff, 2532px 3217px #fff, 1239px 1100px #fff, 1204px 3928px #fff, 2626px 3719px #fff,
    1639px 1597px #fff, 429px 3185px #fff, 1879px 2844px #fff, 597px 958px #fff, 2507px 3646px #fff, 1242px 2460px #fff,
    1682px 3864px #fff, 2153px 3547px #fff, 1925px 3542px #fff, 1997px 2708px #fff, 474px 2825px #fff,
    1116px 1770px #fff, 3517px 1995px #fff, 1571px 3360px #fff, 2314px 2658px #fff, 695px 3943px #fff, 1735px 329px #fff,
    435px 1435px #fff, 1763px 1046px #fff, 2082px 2734px #fff, 388px 3532px #fff, 1860px 3961px #fff, 1039px 3893px #fff,
    134px 816px #fff, 3896px 3427px #fff, 3908px 1703px #fff, 3124px 2392px #fff, 2815px 3366px #fff, 906px 917px #fff,
    1455px 803px #fff, 976px 2780px #fff, 1682px 1172px #fff, 2510px 737px #fff, 3292px 821px #fff, 789px 2678px #fff,
    2872px 2169px #fff, 2512px 2721px #fff, 1594px 57px #fff, 3488px 1297px #fff, 1223px 1066px #fff, 3389px 3020px #fff,
    1534px 835px #fff, 384px 322px #fff, 1431px 581px #fff, 2774px 764px #fff, 1420px 2716px #fff, 2118px 1616px #fff,
    2744px 647px #fff, 3403px 3110px #fff, 1644px 3248px #fff, 219px 633px #fff, 3089px 997px #fff, 2006px 2715px #fff,
    2666px 471px #fff, 342px 2628px #fff, 280px 1738px #fff, 3098px 503px #fff, 302px 2914px #fff, 2066px 3275px #fff,
    3731px 3179px #fff, 2052px 1948px #fff, 2715px 1401px #fff, 2437px 924px #fff, 3223px 2230px #fff, 627px 3808px #fff,
    2064px 1762px #fff, 1249px 2891px #fff, 138px 3480px #fff, 2986px 1445px #fff, 1391px 1118px #fff, 443px 3115px #fff,
    2377px 604px #fff, 1607px 21px #fff, 890px 2648px #fff, 2942px 3186px #fff, 1251px 3340px #fff, 1932px 999px #fff,
    1089px 2734px #fff, 566px 2197px #fff, 3206px 670px #fff, 1678px 599px #fff, 2853px 1517px #fff, 2438px 2422px #fff,
    1514px 3617px #fff, 335px 3067px #fff, 1858px 1524px #fff, 1943px 2945px #fff, 2683px 3476px #fff,
    2920px 2047px #fff, 1484px 1553px #fff, 3662px 1273px #fff, 1343px 3330px #fff, 2829px 3354px #fff,
    2531px 2253px #fff, 1246px 3552px #fff, 2545px 1298px #fff, 2098px 293px #fff, 3722px 2098px #fff,
    3164px 2660px #fff, 629px 2512px #fff, 1815px 2019px #fff, 744px 3974px #fff, 737px 896px #fff, 2864px 1337px #fff,
    2662px 2288px #fff, 367px 3568px #fff, 95px 3757px #fff, 1011px 3058px #fff, 1924px 166px #fff, 3756px 271px #fff,
    3385px 1941px #fff, 2092px 809px #fff, 1874px 2429px #fff, 806px 2204px #fff, 3919px 1094px #fff, 2300px 2177px #fff,
    1098px 2268px #fff, 1505px 658px #fff, 2593px 1061px #fff, 2394px 725px #fff, 3545px 3954px #fff, 2967px 854px #fff,
    664px 2627px #fff, 2188px 2944px #fff, 2629px 1789px #fff, 3539px 2323px #fff, 264px 1457px #fff, 419px 486px #fff,
    59px 3176px #fff, 1443px 3762px #fff, 144px 1254px #fff, 2600px 3590px #fff, 1049px 3042px #fff, 2964px 1001px #fff,
    1752px 2947px #fff, 2596px 3673px #fff, 2269px 1036px #fff, 851px 3225px #fff, 1209px 2259px #fff, 207px 3444px #fff,
    435px 987px #fff, 445px 2670px #fff, 430px 3575px #fff, 3707px 443px #fff, 2208px 2266px #fff, 2777px 3679px #fff,
    1375px 1935px #fff, 1143px 3825px #fff, 1867px 1247px #fff, 238px 873px #fff, 426px 1680px #fff, 1095px 127px #fff,
    389px 3539px #fff, 3916px 2240px #fff, 2868px 2309px #fff, 381px 2376px #fff, 2577px 3659px #fff, 2613px 3146px #fff,
    265px 647px #fff, 3554px 1598px #fff, 425px 3478px #fff, 3041px 2945px #fff, 2398px 3261px #fff, 1027px 1477px #fff,
    2846px 2834px #fff, 1323px 290px #fff, 727px 2266px #fff, 3531px 2669px #fff, 3516px 1932px #fff, 1154px 382px #fff,
    1067px 692px #fff, 904px 3545px #fff, 2775px 2764px #fff, 3809px 1810px #fff, 131px 1139px #fff, 3699px 601px #fff,
    2471px 2207px #fff, 411px 3615px #fff, 1472px 2445px #fff, 3376px 3908px #fff, 2654px 1463px #fff,
    3388px 2039px #fff, 329px 3910px #fff, 2559px 466px #fff, 2586px 2203px #fff, 31px 5px #fff, 2720px 917px #fff,
    2702px 3785px #fff, 3908px 250px #fff, 3470px 1392px #fff, 3923px 949px #fff, 3452px 1955px #fff, 143px 454px #fff,
    530px 3947px #fff, 199px 117px #fff, 2464px 1689px #fff, 3337px 1927px #fff, 3621px 3086px #fff, 2495px 604px #fff,
    2689px 1180px #fff, 2237px 2872px #fff, 2868px 299px #fff, 92px 2101px #fff, 868px 2924px #fff, 3777px 271px #fff,
    1439px 1677px #fff, 3881px 1528px #fff, 3054px 1217px #fff, 2360px 2995px #fff, 1283px 3322px #fff,
    669px 1890px #fff, 1789px 3051px #fff, 1857px 2873px #fff, 3233px 2911px #fff, 910px 304px #fff, 2439px 1373px #fff,
    1509px 1535px #fff, 3770px 1238px #fff, 3403px 1043px #fff, 511px 1471px #fff, 3087px 3527px #fff, 965px 2714px #fff,
    83px 2272px #fff, 295px 1142px #fff, 2572px 2439px #fff, 936px 1544px #fff, 850px 3094px #fff, 3853px 3188px #fff,
    2459px 1619px #fff, 2373px 3499px #fff, 642px 2646px #fff, 439px 2566px #fff, 3371px 1104px #fff, 3755px 3656px #fff,
    894px 1221px #fff, 1355px 600px #fff, 637px 2555px #fff, 261px 1670px #fff, 1489px 1078px #fff, 3803px 223px #fff,
    3779px 719px #fff, 2193px 2067px #fff, 1911px 817px #fff, 1445px 1885px #fff, 1972px 2814px #fff, 442px 1789px #fff,
    3545px 961px #fff, 2621px 3327px #fff, 622px 1958px #fff, 1291px 1044px #fff, 2846px 2398px #fff;
}
#stars:after {
  content: ' ';
  position: absolute;
  top: 4000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 2658px 1065px #fff, 2715px 868px #fff, 1201px 2753px #fff, 3909px 1288px #fff, 3895px 2497px #fff,
    3844px 1864px #fff, 2219px 1032px #fff, 3611px 3624px #fff, 195px 3125px #fff, 2761px 549px #fff, 2138px 2032px #fff,
    108px 1621px #fff, 1478px 3839px #fff, 1002px 719px #fff, 3514px 64px #fff, 3143px 2445px #fff, 3937px 1343px #fff,
    1866px 249px #fff, 3058px 1326px #fff, 3393px 2426px #fff, 1518px 805px #fff, 3182px 2594px #fff, 2333px 1962px #fff,
    2967px 2092px #fff, 479px 1371px #fff, 785px 3606px #fff, 2380px 3890px #fff, 1599px 3364px #fff, 1140px 3925px #fff,
    2080px 204px #fff, 100px 2338px #fff, 443px 35px #fff, 3443px 3954px #fff, 1981px 331px #fff, 641px 614px #fff,
    3451px 894px #fff, 517px 1115px #fff, 752px 2410px #fff, 247px 3661px #fff, 1926px 337px #fff, 295px 516px #fff,
    1091px 386px #fff, 3275px 2750px #fff, 3034px 1839px #fff, 1207px 3376px #fff, 1121px 2459px #fff,
    1893px 2035px #fff, 1682px 3551px #fff, 210px 282px #fff, 3634px 3688px #fff, 3444px 3093px #fff, 1879px 3556px #fff,
    3358px 219px #fff, 2915px 626px #fff, 1866px 2252px #fff, 1453px 216px #fff, 2061px 3418px #fff, 3782px 2862px #fff,
    471px 1854px #fff, 185px 95px #fff, 538px 2672px #fff, 3969px 971px #fff, 3342px 718px #fff, 845px 2227px #fff,
    3057px 353px #fff, 3423px 3299px #fff, 1026px 2133px #fff, 2463px 946px #fff, 1120px 3919px #fff, 2344px 1619px #fff,
    1956px 2299px #fff, 2466px 3325px #fff, 683px 1357px #fff, 1445px 1303px #fff, 3046px 970px #fff, 2429px 1465px #fff,
    422px 1861px #fff, 2223px 2491px #fff, 3113px 3930px #fff, 3805px 277px #fff, 1089px 2924px #fff, 3966px 2106px #fff,
    1529px 3121px #fff, 2321px 717px #fff, 2048px 701px #fff, 652px 2161px #fff, 2347px 1269px #fff, 1905px 1445px #fff,
    3573px 3230px #fff, 3765px 869px #fff, 1105px 539px #fff, 356px 934px #fff, 918px 1998px #fff, 3161px 605px #fff,
    1167px 672px #fff, 3853px 3044px #fff, 2933px 3285px #fff, 2220px 1115px #fff, 531px 2790px #fff, 850px 3768px #fff,
    3883px 1758px #fff, 837px 588px #fff, 1628px 626px #fff, 1330px 799px #fff, 2621px 655px #fff, 1960px 2707px #fff,
    3532px 157px #fff, 1774px 3512px #fff, 3598px 364px #fff, 1252px 814px #fff, 340px 3949px #fff, 3429px 342px #fff,
    2254px 1730px #fff, 1436px 1843px #fff, 1288px 920px #fff, 3081px 1326px #fff, 1807px 3736px #fff, 782px 1784px #fff,
    353px 2056px #fff, 1938px 2803px #fff, 1485px 1514px #fff, 917px 3042px #fff, 1847px 2179px #fff, 245px 3187px #fff,
    2718px 3386px #fff, 3386px 2685px #fff, 594px 2903px #fff, 3858px 1247px #fff, 3579px 2813px #fff,
    1920px 3347px #fff, 3897px 2168px #fff, 3506px 2520px #fff, 1086px 1508px #fff, 2059px 3817px #fff,
    1944px 2830px #fff, 3691px 1213px #fff, 3694px 784px #fff, 3357px 3036px #fff, 2153px 262px #fff, 1348px 3179px #fff,
    1607px 933px #fff, 704px 1204px #fff, 2513px 1262px #fff, 2208px 2476px #fff, 1724px 578px #fff, 1006px 1028px #fff,
    1053px 2004px #fff, 2051px 2588px #fff, 2356px 419px #fff, 1353px 965px #fff, 1405px 3843px #fff, 2035px 2217px #fff,
    905px 2907px #fff, 772px 879px #fff, 2969px 74px #fff, 1340px 1094px #fff, 1043px 1489px #fff, 3551px 1814px #fff,
    1717px 1999px #fff, 1707px 3418px #fff, 3012px 1389px #fff, 3847px 1225px #fff, 1669px 1011px #fff,
    1210px 1998px #fff, 862px 1097px #fff, 2655px 3475px #fff, 1382px 3526px #fff, 2894px 1032px #fff,
    1642px 1829px #fff, 423px 149px #fff, 1948px 1927px #fff, 2760px 652px #fff, 2764px 569px #fff, 1919px 2782px #fff,
    3115px 3485px #fff, 2366px 2980px #fff, 2502px 2891px #fff, 405px 858px #fff, 1771px 233px #fff, 273px 3178px #fff,
    428px 55px #fff, 1941px 490px #fff, 1617px 2416px #fff, 2849px 2210px #fff, 973px 485px #fff, 2683px 1603px #fff,
    218px 1828px #fff, 515px 2900px #fff, 2669px 2195px #fff, 551px 3100px #fff, 983px 3541px #fff, 1657px 1694px #fff,
    1341px 2122px #fff, 3909px 1776px #fff, 1376px 1819px #fff, 3220px 3413px #fff, 2730px 417px #fff, 1231px 312px #fff,
    1022px 2611px #fff, 2146px 3177px #fff, 3709px 2257px #fff, 345px 188px #fff, 3721px 1877px #fff, 614px 657px #fff,
    1365px 1331px #fff, 2518px 2792px #fff, 1878px 3926px #fff, 1405px 3608px #fff, 1938px 2117px #fff, 7px 658px #fff,
    3423px 3141px #fff, 2115px 1511px #fff, 1720px 1737px #fff, 1985px 2886px #fff, 3565px 1281px #fff,
    3410px 2844px #fff, 3389px 3892px #fff, 3371px 2466px #fff, 2003px 3729px #fff, 1968px 127px #fff,
    3177px 2436px #fff, 2037px 930px #fff, 1526px 1172px #fff, 3154px 3254px #fff, 1053px 2774px #fff,
    3884px 1870px #fff, 3879px 3227px #fff, 821px 3832px #fff, 1177px 2876px #fff, 130px 1034px #fff, 3377px 108px #fff,
    2412px 3305px #fff, 1482px 813px #fff, 1624px 3876px #fff, 2356px 3876px #fff, 1486px 3885px #fff,
    2670px 3974px #fff, 2957px 3123px #fff, 1114px 3695px #fff, 1178px 3370px #fff, 106px 378px #fff, 606px 2267px #fff,
    2707px 484px #fff, 3869px 3187px #fff, 1597px 387px #fff, 3681px 219px #fff, 558px 700px #fff, 132px 652px #fff,
    1776px 1295px #fff, 1554px 1100px #fff, 2509px 2746px #fff, 2577px 1314px #fff, 1129px 204px #fff, 1480px 161px #fff,
    3496px 1561px #fff, 1171px 3954px #fff, 3323px 81px #fff, 2630px 827px #fff, 3015px 1809px #fff, 2195px 3374px #fff,
    1862px 32px #fff, 2911px 1123px #fff, 1810px 1813px #fff, 1600px 542px #fff, 3013px 1256px #fff, 1146px 3929px #fff,
    3329px 2px #fff, 2835px 3936px #fff, 2522px 1018px #fff, 1797px 524px #fff, 2112px 2765px #fff, 628px 2675px #fff,
    3521px 2095px #fff, 3379px 898px #fff, 944px 461px #fff, 2095px 3051px #fff, 2405px 2309px #fff, 3965px 1192px #fff,
    518px 1331px #fff, 2462px 610px #fff, 2493px 3146px #fff, 2950px 2364px #fff, 1705px 3699px #fff, 1141px 979px #fff,
    391px 1331px #fff, 2038px 2740px #fff, 3189px 2676px #fff, 3514px 1319px #fff, 2263px 3742px #fff,
    3632px 1645px #fff, 3213px 1119px #fff, 2768px 2376px #fff, 2589px 1051px #fff, 3248px 2996px #fff,
    3795px 1189px #fff, 133px 3857px #fff, 1735px 1445px #fff, 2839px 421px #fff, 959px 1149px #fff, 2757px 3698px #fff,
    1227px 3733px #fff, 2778px 1357px #fff, 2170px 1447px #fff, 2059px 671px #fff, 87px 2961px #fff, 1801px 2309px #fff,
    2903px 196px #fff, 931px 1354px #fff, 569px 957px #fff, 484px 3367px #fff, 1475px 2279px #fff, 3957px 625px #fff,
    1800px 2226px #fff, 3437px 2391px #fff, 505px 677px #fff, 3742px 2428px #fff, 1764px 1707px #fff, 3496px 3181px #fff,
    3881px 34px #fff, 3429px 3842px #fff, 1472px 2310px #fff, 3487px 754px #fff, 3223px 2342px #fff, 1306px 2195px #fff,
    2483px 2271px #fff, 3600px 37px #fff, 3285px 1984px #fff, 582px 2524px #fff, 2239px 1462px #fff, 2706px 2300px #fff,
    3017px 3553px #fff, 1885px 1221px #fff, 492px 3266px #fff, 1369px 3867px #fff, 2145px 3443px #fff, 2946px 194px #fff,
    1578px 3713px #fff, 600px 2027px #fff, 3551px 1899px #fff, 2877px 2915px #fff, 2597px 3357px #fff, 885px 3648px #fff,
    220px 2973px #fff, 3428px 598px #fff, 8px 1545px #fff, 3594px 3413px #fff, 3599px 2856px #fff, 841px 2247px #fff,
    2755px 3496px #fff, 2286px 1606px #fff, 1701px 1392px #fff, 2555px 3614px #fff, 1400px 59px #fff, 3103px 824px #fff,
    3924px 1122px #fff, 133px 1177px #fff, 1314px 1230px #fff, 941px 3829px #fff, 1170px 1119px #fff, 731px 2735px #fff,
    3358px 2816px #fff, 1898px 1206px #fff, 3334px 463px #fff, 2955px 1955px #fff, 776px 2338px #fff, 3604px 2659px #fff,
    924px 2029px #fff, 349px 2684px #fff, 2656px 2316px #fff, 2342px 1812px #fff, 1057px 404px #fff, 2700px 1156px #fff,
    2721px 2474px #fff, 1561px 2799px #fff, 470px 3192px #fff, 1776px 3559px #fff, 1510px 1336px #fff,
    2089px 1738px #fff, 3097px 2126px #fff, 1653px 3037px #fff, 3019px 86px #fff, 531px 3763px #fff, 2274px 3534px #fff,
    3328px 1523px #fff, 1279px 1511px #fff, 1127px 617px #fff, 3813px 3888px #fff, 3528px 455px #fff, 2202px 660px #fff,
    2690px 1437px #fff, 518px 3266px #fff, 339px 98px #fff, 1338px 1865px #fff, 3578px 435px #fff, 2000px 445px #fff,
    1518px 3076px #fff, 2449px 3476px #fff, 1929px 458px #fff, 379px 1186px #fff, 1751px 3223px #fff, 558px 1725px #fff,
    3548px 738px #fff, 1625px 2947px #fff, 57px 1877px #fff, 1352px 2394px #fff, 733px 495px #fff, 1125px 851px #fff,
    1007px 2357px #fff, 1480px 272px #fff, 609px 224px #fff, 1361px 3987px #fff, 556px 3112px #fff, 2587px 3020px #fff,
    953px 3803px #fff, 3189px 1882px #fff, 1024px 3381px #fff, 268px 290px #fff, 563px 2590px #fff, 2419px 3062px #fff,
    3164px 3452px #fff, 1783px 3737px #fff, 2316px 347px #fff, 1011px 158px #fff, 1314px 710px #fff, 1967px 2834px #fff,
    3604px 993px #fff, 234px 1074px #fff, 100px 3341px #fff, 1990px 3167px #fff, 405px 3980px #fff, 958px 253px #fff,
    324px 1050px #fff, 3565px 3750px #fff, 2079px 2864px #fff, 3541px 284px #fff, 3580px 14px #fff, 1718px 1306px #fff,
    1851px 763px #fff, 394px 2739px #fff, 2250px 3861px #fff, 1641px 3206px #fff, 2465px 1440px #fff, 3123px 3939px #fff,
    3107px 114px #fff, 3863px 301px #fff, 2532px 3217px #fff, 1239px 1100px #fff, 1204px 3928px #fff, 2626px 3719px #fff,
    1639px 1597px #fff, 429px 3185px #fff, 1879px 2844px #fff, 597px 958px #fff, 2507px 3646px #fff, 1242px 2460px #fff,
    1682px 3864px #fff, 2153px 3547px #fff, 1925px 3542px #fff, 1997px 2708px #fff, 474px 2825px #fff,
    1116px 1770px #fff, 3517px 1995px #fff, 1571px 3360px #fff, 2314px 2658px #fff, 695px 3943px #fff, 1735px 329px #fff,
    435px 1435px #fff, 1763px 1046px #fff, 2082px 2734px #fff, 388px 3532px #fff, 1860px 3961px #fff, 1039px 3893px #fff,
    134px 816px #fff, 3896px 3427px #fff, 3908px 1703px #fff, 3124px 2392px #fff, 2815px 3366px #fff, 906px 917px #fff,
    1455px 803px #fff, 976px 2780px #fff, 1682px 1172px #fff, 2510px 737px #fff, 3292px 821px #fff, 789px 2678px #fff,
    2872px 2169px #fff, 2512px 2721px #fff, 1594px 57px #fff, 3488px 1297px #fff, 1223px 1066px #fff, 3389px 3020px #fff,
    1534px 835px #fff, 384px 322px #fff, 1431px 581px #fff, 2774px 764px #fff, 1420px 2716px #fff, 2118px 1616px #fff,
    2744px 647px #fff, 3403px 3110px #fff, 1644px 3248px #fff, 219px 633px #fff, 3089px 997px #fff, 2006px 2715px #fff,
    2666px 471px #fff, 342px 2628px #fff, 280px 1738px #fff, 3098px 503px #fff, 302px 2914px #fff, 2066px 3275px #fff,
    3731px 3179px #fff, 2052px 1948px #fff, 2715px 1401px #fff, 2437px 924px #fff, 3223px 2230px #fff, 627px 3808px #fff,
    2064px 1762px #fff, 1249px 2891px #fff, 138px 3480px #fff, 2986px 1445px #fff, 1391px 1118px #fff, 443px 3115px #fff,
    2377px 604px #fff, 1607px 21px #fff, 890px 2648px #fff, 2942px 3186px #fff, 1251px 3340px #fff, 1932px 999px #fff,
    1089px 2734px #fff, 566px 2197px #fff, 3206px 670px #fff, 1678px 599px #fff, 2853px 1517px #fff, 2438px 2422px #fff,
    1514px 3617px #fff, 335px 3067px #fff, 1858px 1524px #fff, 1943px 2945px #fff, 2683px 3476px #fff,
    2920px 2047px #fff, 1484px 1553px #fff, 3662px 1273px #fff, 1343px 3330px #fff, 2829px 3354px #fff,
    2531px 2253px #fff, 1246px 3552px #fff, 2545px 1298px #fff, 2098px 293px #fff, 3722px 2098px #fff,
    3164px 2660px #fff, 629px 2512px #fff, 1815px 2019px #fff, 744px 3974px #fff, 737px 896px #fff, 2864px 1337px #fff,
    2662px 2288px #fff, 367px 3568px #fff, 95px 3757px #fff, 1011px 3058px #fff, 1924px 166px #fff, 3756px 271px #fff,
    3385px 1941px #fff, 2092px 809px #fff, 1874px 2429px #fff, 806px 2204px #fff, 3919px 1094px #fff, 2300px 2177px #fff,
    1098px 2268px #fff, 1505px 658px #fff, 2593px 1061px #fff, 2394px 725px #fff, 3545px 3954px #fff, 2967px 854px #fff,
    664px 2627px #fff, 2188px 2944px #fff, 2629px 1789px #fff, 3539px 2323px #fff, 264px 1457px #fff, 419px 486px #fff,
    59px 3176px #fff, 1443px 3762px #fff, 144px 1254px #fff, 2600px 3590px #fff, 1049px 3042px #fff, 2964px 1001px #fff,
    1752px 2947px #fff, 2596px 3673px #fff, 2269px 1036px #fff, 851px 3225px #fff, 1209px 2259px #fff, 207px 3444px #fff,
    435px 987px #fff, 445px 2670px #fff, 430px 3575px #fff, 3707px 443px #fff, 2208px 2266px #fff, 2777px 3679px #fff,
    1375px 1935px #fff, 1143px 3825px #fff, 1867px 1247px #fff, 238px 873px #fff, 426px 1680px #fff, 1095px 127px #fff,
    389px 3539px #fff, 3916px 2240px #fff, 2868px 2309px #fff, 381px 2376px #fff, 2577px 3659px #fff, 2613px 3146px #fff,
    265px 647px #fff, 3554px 1598px #fff, 425px 3478px #fff, 3041px 2945px #fff, 2398px 3261px #fff, 1027px 1477px #fff,
    2846px 2834px #fff, 1323px 290px #fff, 727px 2266px #fff, 3531px 2669px #fff, 3516px 1932px #fff, 1154px 382px #fff,
    1067px 692px #fff, 904px 3545px #fff, 2775px 2764px #fff, 3809px 1810px #fff, 131px 1139px #fff, 3699px 601px #fff,
    2471px 2207px #fff, 411px 3615px #fff, 1472px 2445px #fff, 3376px 3908px #fff, 2654px 1463px #fff,
    3388px 2039px #fff, 329px 3910px #fff, 2559px 466px #fff, 2586px 2203px #fff, 31px 5px #fff, 2720px 917px #fff,
    2702px 3785px #fff, 3908px 250px #fff, 3470px 1392px #fff, 3923px 949px #fff, 3452px 1955px #fff, 143px 454px #fff,
    530px 3947px #fff, 199px 117px #fff, 2464px 1689px #fff, 3337px 1927px #fff, 3621px 3086px #fff, 2495px 604px #fff,
    2689px 1180px #fff, 2237px 2872px #fff, 2868px 299px #fff, 92px 2101px #fff, 868px 2924px #fff, 3777px 271px #fff,
    1439px 1677px #fff, 3881px 1528px #fff, 3054px 1217px #fff, 2360px 2995px #fff, 1283px 3322px #fff,
    669px 1890px #fff, 1789px 3051px #fff, 1857px 2873px #fff, 3233px 2911px #fff, 910px 304px #fff, 2439px 1373px #fff,
    1509px 1535px #fff, 3770px 1238px #fff, 3403px 1043px #fff, 511px 1471px #fff, 3087px 3527px #fff, 965px 2714px #fff,
    83px 2272px #fff, 295px 1142px #fff, 2572px 2439px #fff, 936px 1544px #fff, 850px 3094px #fff, 3853px 3188px #fff,
    2459px 1619px #fff, 2373px 3499px #fff, 642px 2646px #fff, 439px 2566px #fff, 3371px 1104px #fff, 3755px 3656px #fff,
    894px 1221px #fff, 1355px 600px #fff, 637px 2555px #fff, 261px 1670px #fff, 1489px 1078px #fff, 3803px 223px #fff,
    3779px 719px #fff, 2193px 2067px #fff, 1911px 817px #fff, 1445px 1885px #fff, 1972px 2814px #fff, 442px 1789px #fff,
    3545px 961px #fff, 2621px 3327px #fff, 622px 1958px #fff, 1291px 1044px #fff, 2846px 2398px #fff;
}
#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  animation: animStar 100s linear infinite;
  box-shadow: 3897px 708px #fff, 3409px 1121px #fff, 753px 2955px #fff, 482px 554px #fff, 1710px 2807px #fff,
    1806px 1991px #fff, 3379px 1194px #fff, 661px 322px #fff, 651px 3594px #fff, 479px 2191px #fff, 934px 3903px #fff,
    1553px 3352px #fff, 2750px 1437px #fff, 263px 322px #fff, 1733px 3916px #fff, 1127px 3818px #fff, 2893px 1119px #fff,
    630px 2521px #fff, 1231px 3601px #fff, 436px 625px #fff, 1787px 2917px #fff, 1763px 2491px #fff, 3170px 880px #fff,
    1926px 1984px #fff, 2571px 2226px #fff, 319px 151px #fff, 2490px 1905px #fff, 3120px 1062px #fff, 2109px 1917px #fff,
    3845px 2665px #fff, 2636px 2016px #fff, 2960px 1075px #fff, 1466px 2273px #fff, 2164px 3427px #fff,
    3286px 1844px #fff, 2713px 2425px #fff, 3040px 106px #fff, 967px 3609px #fff, 3399px 1626px #fff, 870px 2462px #fff,
    3600px 3943px #fff, 1140px 1428px #fff, 2190px 2165px #fff, 962px 334px #fff, 1600px 588px #fff, 1498px 1049px #fff,
    2649px 1003px #fff, 3437px 1572px #fff, 1461px 2045px #fff, 3491px 1103px #fff, 1497px 1546px #fff,
    1501px 584px #fff, 72px 3423px #fff, 124px 2294px #fff, 2018px 931px #fff, 2269px 980px #fff, 1543px 173px #fff,
    200px 2425px #fff, 936px 577px #fff, 3257px 1265px #fff, 2565px 2936px #fff, 972px 541px #fff, 3353px 1467px #fff,
    3253px 243px #fff, 763px 2739px #fff, 2290px 1303px #fff, 998px 3168px #fff, 384px 2916px #fff, 2789px 262px #fff,
    2069px 846px #fff, 1912px 2433px #fff, 3855px 822px #fff, 1706px 677px #fff, 1415px 1694px #fff, 615px 763px #fff,
    2742px 1323px #fff, 2313px 641px #fff, 2682px 1627px #fff, 1288px 1204px #fff, 2559px 2032px #fff,
    1479px 1537px #fff, 1215px 1672px #fff, 2635px 3536px #fff, 3370px 1287px #fff, 2515px 2601px #fff,
    3370px 109px #fff, 1474px 2105px #fff, 3486px 3754px #fff, 660px 154px #fff, 402px 1436px #fff, 3233px 3968px #fff,
    1011px 1582px #fff, 126px 2956px #fff, 1680px 3975px #fff, 976px 1327px #fff, 3171px 3221px #fff, 1826px 433px #fff,
    597px 1120px #fff, 2664px 3020px #fff, 370px 1258px #fff, 864px 1104px #fff, 995px 3544px #fff, 2219px 171px #fff,
    2500px 2242px #fff, 872px 3860px #fff, 1934px 513px #fff, 109px 522px #fff, 1494px 998px #fff, 3259px 439px #fff,
    2980px 3046px #fff, 1660px 2796px #fff, 2612px 3503px #fff, 3740px 1689px #fff, 3411px 3918px #fff,
    600px 1502px #fff, 2859px 1445px #fff, 1412px 1243px #fff, 721px 386px #fff, 3277px 580px #fff, 3591px 2945px #fff,
    2949px 613px #fff, 228px 1395px #fff, 2524px 1233px #fff, 3987px 3543px #fff, 3580px 296px #fff, 884px 3434px #fff,
    1174px 677px #fff, 2975px 3811px #fff, 421px 1421px #fff, 2530px 1022px #fff, 734px 3316px #fff, 472px 1158px #fff,
    2799px 3246px #fff, 741px 1654px #fff, 3114px 3712px #fff, 3233px 581px #fff, 792px 3763px #fff, 3632px 2994px #fff,
    3796px 532px #fff, 953px 3761px #fff, 3568px 3031px #fff, 489px 1843px #fff, 2394px 3696px #fff, 2623px 2110px #fff,
    3585px 2668px #fff, 2210px 2737px #fff, 2340px 3620px #fff, 3154px 1398px #fff, 1857px 2659px #fff,
    2352px 1188px #fff, 2735px 2561px #fff, 3454px 2274px #fff, 1648px 462px #fff, 1774px 2001px #fff, 3695px 932px #fff,
    2212px 2573px #fff, 424px 2334px #fff, 1292px 1971px #fff, 391px 1282px #fff, 3290px 541px #fff, 3386px 3830px #fff,
    1702px 1048px #fff, 496px 2398px #fff, 3555px 3385px #fff, 2269px 2994px #fff, 908px 2324px #fff, 2886px 3938px #fff,
    3708px 2307px #fff, 2355px 1533px #fff, 2443px 878px #fff, 612px 600px #fff, 1581px 766px #fff, 2692px 199px #fff,
    994px 534px #fff, 313px 3247px #fff, 1816px 3662px #fff, 2433px 2471px #fff, 3235px 2424px #fff, 1002px 2465px #fff,
    3422px 4px #fff, 698px 1163px #fff, 2839px 522px #fff, 2187px 2415px #fff, 3966px 3239px #fff, 810px 3919px #fff,
    967px 3176px #fff, 801px 3636px #fff, 3883px 1056px #fff, 3685px 757px #fff, 2947px 3473px #fff, 1507px 86px #fff,
    1155px 3067px #fff, 3323px 2564px #fff, 3093px 2914px #fff, 13px 727px #fff, 3300px 2050px #fff, 3219px 825px #fff,
    1759px 2470px #fff, 1306px 2508px #fff, 2474px 1417px #fff;
}
#stars2:after {
  content: ' ';
  position: absolute;
  top: 4000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 3897px 708px #fff, 3409px 1121px #fff, 753px 2955px #fff, 482px 554px #fff, 1710px 2807px #fff,
    1806px 1991px #fff, 3379px 1194px #fff, 661px 322px #fff, 651px 3594px #fff, 479px 2191px #fff, 934px 3903px #fff,
    1553px 3352px #fff, 2750px 1437px #fff, 263px 322px #fff, 1733px 3916px #fff, 1127px 3818px #fff, 2893px 1119px #fff,
    630px 2521px #fff, 1231px 3601px #fff, 436px 625px #fff, 1787px 2917px #fff, 1763px 2491px #fff, 3170px 880px #fff,
    1926px 1984px #fff, 2571px 2226px #fff, 319px 151px #fff, 2490px 1905px #fff, 3120px 1062px #fff, 2109px 1917px #fff,
    3845px 2665px #fff, 2636px 2016px #fff, 2960px 1075px #fff, 1466px 2273px #fff, 2164px 3427px #fff,
    3286px 1844px #fff, 2713px 2425px #fff, 3040px 106px #fff, 967px 3609px #fff, 3399px 1626px #fff, 870px 2462px #fff,
    3600px 3943px #fff, 1140px 1428px #fff, 2190px 2165px #fff, 962px 334px #fff, 1600px 588px #fff, 1498px 1049px #fff,
    2649px 1003px #fff, 3437px 1572px #fff, 1461px 2045px #fff, 3491px 1103px #fff, 1497px 1546px #fff,
    1501px 584px #fff, 72px 3423px #fff, 124px 2294px #fff, 2018px 931px #fff, 2269px 980px #fff, 1543px 173px #fff,
    200px 2425px #fff, 936px 577px #fff, 3257px 1265px #fff, 2565px 2936px #fff, 972px 541px #fff, 3353px 1467px #fff,
    3253px 243px #fff, 763px 2739px #fff, 2290px 1303px #fff, 998px 3168px #fff, 384px 2916px #fff, 2789px 262px #fff,
    2069px 846px #fff, 1912px 2433px #fff, 3855px 822px #fff, 1706px 677px #fff, 1415px 1694px #fff, 615px 763px #fff,
    2742px 1323px #fff, 2313px 641px #fff, 2682px 1627px #fff, 1288px 1204px #fff, 2559px 2032px #fff,
    1479px 1537px #fff, 1215px 1672px #fff, 2635px 3536px #fff, 3370px 1287px #fff, 2515px 2601px #fff,
    3370px 109px #fff, 1474px 2105px #fff, 3486px 3754px #fff, 660px 154px #fff, 402px 1436px #fff, 3233px 3968px #fff,
    1011px 1582px #fff, 126px 2956px #fff, 1680px 3975px #fff, 976px 1327px #fff, 3171px 3221px #fff, 1826px 433px #fff,
    597px 1120px #fff, 2664px 3020px #fff, 370px 1258px #fff, 864px 1104px #fff, 995px 3544px #fff, 2219px 171px #fff,
    2500px 2242px #fff, 872px 3860px #fff, 1934px 513px #fff, 109px 522px #fff, 1494px 998px #fff, 3259px 439px #fff,
    2980px 3046px #fff, 1660px 2796px #fff, 2612px 3503px #fff, 3740px 1689px #fff, 3411px 3918px #fff,
    600px 1502px #fff, 2859px 1445px #fff, 1412px 1243px #fff, 721px 386px #fff, 3277px 580px #fff, 3591px 2945px #fff,
    2949px 613px #fff, 228px 1395px #fff, 2524px 1233px #fff, 3987px 3543px #fff, 3580px 296px #fff, 884px 3434px #fff,
    1174px 677px #fff, 2975px 3811px #fff, 421px 1421px #fff, 2530px 1022px #fff, 734px 3316px #fff, 472px 1158px #fff,
    2799px 3246px #fff, 741px 1654px #fff, 3114px 3712px #fff, 3233px 581px #fff, 792px 3763px #fff, 3632px 2994px #fff,
    3796px 532px #fff, 953px 3761px #fff, 3568px 3031px #fff, 489px 1843px #fff, 2394px 3696px #fff, 2623px 2110px #fff,
    3585px 2668px #fff, 2210px 2737px #fff, 2340px 3620px #fff, 3154px 1398px #fff, 1857px 2659px #fff,
    2352px 1188px #fff, 2735px 2561px #fff, 3454px 2274px #fff, 1648px 462px #fff, 1774px 2001px #fff, 3695px 932px #fff,
    2212px 2573px #fff, 424px 2334px #fff, 1292px 1971px #fff, 391px 1282px #fff, 3290px 541px #fff, 3386px 3830px #fff,
    1702px 1048px #fff, 496px 2398px #fff, 3555px 3385px #fff, 2269px 2994px #fff, 908px 2324px #fff, 2886px 3938px #fff,
    3708px 2307px #fff, 2355px 1533px #fff, 2443px 878px #fff, 612px 600px #fff, 1581px 766px #fff, 2692px 199px #fff,
    994px 534px #fff, 313px 3247px #fff, 1816px 3662px #fff, 2433px 2471px #fff, 3235px 2424px #fff, 1002px 2465px #fff,
    3422px 4px #fff, 698px 1163px #fff, 2839px 522px #fff, 2187px 2415px #fff, 3966px 3239px #fff, 810px 3919px #fff,
    967px 3176px #fff, 801px 3636px #fff, 3883px 1056px #fff, 3685px 757px #fff, 2947px 3473px #fff, 1507px 86px #fff,
    1155px 3067px #fff, 3323px 2564px #fff, 3093px 2914px #fff, 13px 727px #fff, 3300px 2050px #fff, 3219px 825px #fff,
    1759px 2470px #fff, 1306px 2508px #fff, 2474px 1417px #fff;
}
#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  animation: animStar 150s linear infinite;
  box-shadow: 860px 1250px #fff, 1365px 1750px #fff, 1796px 2146px #fff, 3053px 2352px #fff, 600px 536px #fff,
    2162px 904px #fff, 2430px 1792px #fff, 2444px 1447px #fff, 15px 915px #fff, 2844px 300px #fff, 3624px 206px #fff,
    450px 3121px #fff, 1300px 1360px #fff, 679px 3646px #fff, 191px 484px #fff, 2149px 1586px #fff, 2067px 2477px #fff,
    3662px 34px #fff, 2157px 1834px #fff, 2564px 2698px #fff, 168px 352px #fff, 477px 623px #fff, 10px 46px #fff,
    550px 593px #fff, 1500px 2450px #fff, 2563px 1133px #fff, 2038px 2182px #fff, 741px 2736px #fff, 212px 2454px #fff,
    2301px 3684px #fff, 1292px 1903px #fff, 2234px 943px #fff, 2054px 3290px #fff, 277px 2028px #fff, 188px 3058px #fff,
    412px 84px #fff, 3338px 587px #fff, 1338px 3755px #fff, 2583px 774px #fff, 2474px 3880px #fff, 3200px 2669px #fff,
    3343px 2392px #fff, 1109px 3619px #fff, 420px 2232px #fff, 1224px 2241px #fff, 593px 2879px #fff, 2157px 3708px #fff,
    484px 3573px #fff, 1580px 3656px #fff, 2378px 493px #fff, 267px 2887px #fff, 2471px 2717px #fff, 2751px 823px #fff,
    2941px 2048px #fff, 511px 2323px #fff, 1988px 3717px #fff, 2672px 2895px #fff, 1734px 3205px #fff,
    2786px 3319px #fff, 2286px 3121px #fff, 1914px 3163px #fff, 2901px 3596px #fff, 2766px 1119px #fff,
    112px 3092px #fff, 1072px 1689px #fff, 1477px 3530px #fff, 3693px 2165px #fff, 1233px 1178px #fff,
    3559px 2076px #fff, 1821px 1137px #fff, 3119px 516px #fff, 1021px 1233px #fff, 1840px 2348px #fff,
    1882px 1653px #fff, 1930px 169px #fff, 2199px 3565px #fff, 2909px 304px #fff, 2055px 1091px #fff, 2765px 708px #fff,
    3017px 2123px #fff, 412px 1029px #fff, 3413px 743px #fff, 1227px 3478px #fff, 1358px 3147px #fff, 1124px 1737px #fff,
    367px 2723px #fff, 254px 3676px #fff, 3123px 2441px #fff, 2002px 1077px #fff, 2986px 220px #fff, 2084px 1276px #fff,
    330px 3092px #fff, 1524px 1215px #fff, 3526px 1477px #fff, 3862px 2099px #fff, 600px 3689px #fff, 2310px 1482px #fff,
    1513px 2862px #fff, 1322px 3533px #fff, 3539px 3959px #fff;
}
#stars3:after {
  content: ' ';
  position: absolute;
  top: 4000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 860px 1250px #fff, 1365px 1750px #fff, 1796px 2146px #fff, 3053px 2352px #fff, 600px 536px #fff,
    2162px 904px #fff, 2430px 1792px #fff, 2444px 1447px #fff, 15px 915px #fff, 2844px 300px #fff, 3624px 206px #fff,
    450px 3121px #fff, 1300px 1360px #fff, 679px 3646px #fff, 191px 484px #fff, 2149px 1586px #fff, 2067px 2477px #fff,
    3662px 34px #fff, 2157px 1834px #fff, 2564px 2698px #fff, 168px 352px #fff, 477px 623px #fff, 10px 46px #fff,
    550px 593px #fff, 1500px 2450px #fff, 2563px 1133px #fff, 2038px 2182px #fff, 741px 2736px #fff, 212px 2454px #fff,
    2301px 3684px #fff, 1292px 1903px #fff, 2234px 943px #fff, 2054px 3290px #fff, 277px 2028px #fff, 188px 3058px #fff,
    412px 84px #fff, 3338px 587px #fff, 1338px 3755px #fff, 2583px 774px #fff, 2474px 3880px #fff, 3200px 2669px #fff,
    3343px 2392px #fff, 1109px 3619px #fff, 420px 2232px #fff, 1224px 2241px #fff, 593px 2879px #fff, 2157px 3708px #fff,
    484px 3573px #fff, 1580px 3656px #fff, 2378px 493px #fff, 267px 2887px #fff, 2471px 2717px #fff, 2751px 823px #fff,
    2941px 2048px #fff, 511px 2323px #fff, 1988px 3717px #fff, 2672px 2895px #fff, 1734px 3205px #fff,
    2786px 3319px #fff, 2286px 3121px #fff, 1914px 3163px #fff, 2901px 3596px #fff, 2766px 1119px #fff,
    112px 3092px #fff, 1072px 1689px #fff, 1477px 3530px #fff, 3693px 2165px #fff, 1233px 1178px #fff,
    3559px 2076px #fff, 1821px 1137px #fff, 3119px 516px #fff, 1021px 1233px #fff, 1840px 2348px #fff,
    1882px 1653px #fff, 1930px 169px #fff, 2199px 3565px #fff, 2909px 304px #fff, 2055px 1091px #fff, 2765px 708px #fff,
    3017px 2123px #fff, 412px 1029px #fff, 3413px 743px #fff, 1227px 3478px #fff, 1358px 3147px #fff, 1124px 1737px #fff,
    367px 2723px #fff, 254px 3676px #fff, 3123px 2441px #fff, 2002px 1077px #fff, 2986px 220px #fff, 2084px 1276px #fff,
    330px 3092px #fff, 1524px 1215px #fff, 3526px 1477px #fff, 3862px 2099px #fff, 600px 3689px #fff, 2310px 1482px #fff,
    1513px 2862px #fff, 1322px 3533px #fff, 3539px 3959px #fff;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-4000px);
  }
}
</style>
