// Generated by CoffeeScript 1.4.0

Workspace.factory('annotationSocket', [
  'socketFactory', function(socketFactory) {
    var mySocket, theSocket;
    mySocket = io.connect('/some/path', {
      'force new connection': true
    });
    theSocket = socketFactory({
      ioSocket: mySocket
    });
    return theSocket;
  }
]);
