new Vue({
    el: '#app',
    data: {
        platform: '',
        path: '',
        conf: '',
        peersList: [
          'explorer.myhush.org',
          'stilgar.leto.net',
          'dnsseed.myhush.org',
          'dnsseed2.myhush.org',
          'dnsseed.bleuzero.com',
          'dnsseed.hush.quebec'            
        ],
        optionDaemon: 1,
        optionServer: 1,
        optionTor: 0,
        optionGen: 0,
        optionGenProcLimit: 2,
        optionEquihashSolver: 'tromp',
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
            this.path = '/home/user/.hush'
          } else if (this.platform == "Mac OS") {
            this.path = '~/Library/Application Support/Hush/hush.conf'
          } else {
            this.path = 'C:\\Users\\your_username\\AppData\\Roaming\\Hush'
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
            "# HUSH Configuration File<br /><br /># This file has been automatically generated by Hush Config Generator. It may be further customized by hand only.<br /><br /># Creation date: " + compileTime + "<br /><br /># The rpcuser/rpcpassword are used for the local call to hushd. The rpcpassword was randomly set.<br /><br /># Start Hush Configuration<br /><br />daemon=" + this.optionDaemon + "<br />server=" + this.optionServer + "<br />rpcallowip=" + this.optionRpcAllowIp + "<br />rpcuser=" + this.optionRpcUser + "<br />rpcpassword=" + this.optionRpcPassword
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
            this.conf = this.conf + "<br />addnode=hushnodexptkgea3.onion"
          }
          $('#profile').show()
        }
      }
});
