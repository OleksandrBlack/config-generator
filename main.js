new Vue({
    el: '#app',
    data: {
        platform: '',
        path: '',
        conf: '',
        peersList: [
          '5.9.102.210',
          '63.141.241.74',
          '142.54.164.114',
          '104.236.244.215',
          '142.54.162.50',
          '69.30.201.26'            
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
        customPath: 0,
        customMinerToAddress: 0,
        optionMinerAddress: '',
        optionRpcAllowIp: '127.0.0.1',
        optionRpcUser: 'rpcuser',
        optionRpcPassword: Math.random().toString(36).slice(2),
        optionShowMetrics: 0,
        optionDataDir: ''
    },
    methods: {
        setPlatform: function (option) {
          this.platform = option
          if (this.platform == 'Linux') {
            this.path = '/home/user/.komodo/komodo.conf'
          } else if (this.platform == "Mac OS") {
            this.path = '~/Library/Application Support/Komodo/komodo.conf'
          } else {
            this.path = 'C:\\Users\\your_username\\AppData\\Roaming\\Komodo\\komodo.conf'
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
            "# Komodod Configuaration File<br /><br /># Made by Komodo Config Generator, on: " + compileTime + ". The rpcpassword was randomly set.<br /><br /># Make sure your config file is saved as komodo.conf and not komodo.conf.txt or similar.<br /><br />daemon=" + this.optionDaemon + "<br />server=" + this.optionServer + "<br />rpcallowip=" + this.optionRpcAllowIp + "<br />rpcuser=" + this.optionRpcUser + "<br />rpcpassword=" + this.optionRpcPassword
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
          for (var i = 0; i< this.peersList.length; i++) {
            if (i == 0) {
              this.conf = this.conf + "<br />"
            }
            this.conf = this.conf + "<br />addnode=" + this.peersList[i]
          }
          if (this.optionTor == 1) {
            this.conf = this.conf + "<br />addnode=hwdkehdke2u62u7a.onion" + "<br />addnode=jsyh3w5huo4j5x6y.onion" + "<br />addnode=sncc4su7phf4hc3h.onion" + "<br />addnode=4shay2omzoretwtz.onion" + "<br />addnode=j66xfe5u43pww3e4.onion" + "<br />addnode=zglsemlpr2ddvgm2.onion" + "<br />addnode=onoj652tqwlf662f.onion" + "<br />addnode=wqajno7lufuo5a54.onion" + "<br />addnode=3t2vybqwit5ntprf.onion"
          }
          $('#profile').show()
        }
      }
});
