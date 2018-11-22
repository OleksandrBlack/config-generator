new Vue({
    el: '#app',
    data: {
        platform: '',
        path: '',
        conf: '',
        peersList: [
          'dnsseed.ipv6admin.com',
          'dnsseedua.local.support',
          '140.82.45.57',
          '8.12.22.254',
          '140.82.11.189',
          '185.20.184.51',
          '176.107.179.32',
          '45.63.13.60'          
        ],
        optionDaemon: 1,
        optionServer: 1,
        optionTor: 0,
        optionGen: 0,
        optionGenProcLimit: 2,
        optionEquihashSolver: 'tromp',
        optionAddnode: [],
        optionWhiteList: [],
        tempWhitelist: '',
		tempAddnode: '',
        customPath: 0,
        customMinerToAddress: 0,
        optionMinerAddress: '',
        optionRpcAllowIp: '127.0.0.1',
        optionRpcUser: 'rpcuser',
        optionRpcPassword: Math.random().toString(36).slice(2),
        optionShowMetrics: 0,
        optionDataDir: '',
	optionTxindex: 0,
	optionAddressindex: 0,
	optionSpentindex: 0,
	optionTimestampindex: 0
    },
    methods: {
        setPlatform: function (option) {
          this.platform = option
          if (this.platform == 'Linux') {
            this.path = '/home/user/.safecoin/safecoin.conf'
          } else if (this.platform == "Mac OS") {
            this.path = '~/Library/Application Support/Safecoin/safecoin.conf'
          } else {
            this.path = 'C:\\Users\\your_username\\AppData\\Roaming\\Safecoin\\safecoin.conf'
          }
          $('.platform-banner').show()
          $(document.body).animate({
             'scrollTop':   $('#build').offset().top
          }, 1200);
        },
        showPathInput: function () {
          $('#paths').toggle()
        },
        pickPath: function () {

        },
        showMinerInfo: function () {
          $('#threads').toggle()
          $('#minerAddress').toggle()

          if (this.customMinerToAddress == 1) {
            $('#minerInput').toggle()
          }
        },
        showMinerAddress: function () {
          $('#minerInput').toggle()
        },
        decreaseThreads: function () {
          if (this.optionGenProcLimit != 0) {
            this.optionGenProcLimit--
          }
        },
        increaseThreads: function () {
          this.optionGenProcLimit++
        },
        addAddnode: function (value) {
          this.optionAddnode.push(value)
          this.tempAddnode = ''
        },
        removeAddnodeItem: function (item) {
          console.log(item)
          var index = this.optionAddnode.indexOf(item)
          this.optionAddnode.splice(index, 1)
        },
        addWhiteList: function (value) {
          this.optionWhiteList.push(value)
          this.tempWhitelist = ''
        },
        removeWhiteListItem: function (item) {
          console.log(item)
          var index = this.optionWhiteList.indexOf(item)
          this.optionWhiteList.splice(index, 1)
        },
        compile: function () {
          var currentdate = new Date();
          var compileTime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds()
          this.conf =
            "# Safecoind Configuaration File<br /><br /># Made by Safecoin Config Generator, on: " + compileTime + ". The rpcpassword was randomly set.<br /><br /># Make sure your config file is saved as safecoin.conf and not safecoin.conf.txt or similar.<br /><br />daemon=" + this.optionDaemon + "<br />server=" + this.optionServer + "<br />rpcallowip=" + this.optionRpcAllowIp + "<br />rpcuser=" + this.optionRpcUser + "<br />rpcpassword=" + this.optionRpcPassword
          if (this.optionAddnode.length != 0) {
            this.conf = this.conf + "<br /><br />addnode=" + this.optionAddnode
          }
          if (this.optionWhiteList.length != 0) {
            this.conf = this.conf + "<br /><br />whitelist=" + this.optionWhiteList
          }
          if (this.customPath == 1) {
            this.conf = this.conf + "<br /><br />datadir=" + this.optionDataDir
          }
          if (this.optionGen == 1) {
            this.conf = this.conf + "<br /><br />gen=1<br />genproclimit=" + this.optionGenProcLimit + "<br />equihashsolver=tromp"
          }
          if (this.customMinerToAddress == 1) {
            this.conf = this.conf + "<br />mineraddress=" + this.optionMinerAddress
          }
          if (this.optionShowMetrics == 1) {
            this.conf = this.conf + "<br /><br />showmetrics=1"
          }
	  if (this.optionTxindex == 1) {
            this.conf = this.conf + "<br /><br />txindex=1"
          }
	  if (this.optionAddressindex == 1) {
            this.conf = this.conf + "<br />addressindex=1"
          }
	  if (this.optionSpentindex == 1) {
            this.conf = this.conf + "<br />spentindex=1"
          }
	  if (this.optionTimestampindex == 1) {
            this.conf = this.conf + "<br />timestampindex=1"
          }
          for (var i = 0; i< this.peersList.length; i++) {
            if (i == 0) {
              this.conf = this.conf + "<br />"
            }
            this.conf = this.conf + "<br />addnode=" + this.peersList[i]
          }
          if (this.optionTor == 1) {
//            this.conf = this.conf + "<br />addnode=hwdkehdke2u62u7a.onion" + "<br />addnode=jsyh3w5huo4j5x6y.onion" + "<br />addnode=sncc4su7phf4hc3h.onion" + "<br />addnode=4shay2omzoretwtz.onion" + "<br />addnode=j66xfe5u43pww3e4.onion" + "<br />addnode=zglsemlpr2ddvgm2.onion" + "<br />addnode=onoj652tqwlf662f.onion" + "<br />addnode=wqajno7lufuo5a54.onion" + "<br />addnode=3t2vybqwit5ntprf.onion"
            this.conf = this.conf + "<br />#Tor nodes add soon..."

          }
          $('#profile').show()
        }
      }
});
