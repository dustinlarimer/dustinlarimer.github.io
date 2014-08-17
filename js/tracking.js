var k = new Keen({ 
  projectId: "53f00287e861701cee000000",
  writeKey: "a45a468aadad2aa46a4713893d5eef0aeaba49e65adde7c7449ae2089a05561489e2f938d3b6d6aa0faa3b862559e2dc5c01f69cd3c3be25cda924e0c017b655bcf12c83b0722640a994c42919fcf0c340b163cce22d1689f630ba877c7f8921fe1cd6e4f297fee93fddcbfe78c3d75b",
  requestType: "beacon"
});

k.setGlobalProperties(function(collection){
  return {
    page: {
      title: document.title,
      host: document.location.host,
      href: document.location.href,
      path: document.location.pathname,
      protocol: document.location.protocol.replace(/:/g, ''),
      query: document.location.search
    },
    visitor: {
      ip_address: "${keen.ip}",
      user_agent: "${keen.user_agent}",
      referrer: document.referrer
    },
    keen: {
      timestamp: new Date().toISOString(), 
      addons: [
        { name:"keen:ip_to_geo", input: { ip:"visitor.ip_address" }, output:"visitor.geo" },
        { name:"keen:ua_parser", input: { ua_string:"visitor.user_agent" }, output:"visitor.tech" }
      ]
    }
  };
})
k.addEvent("visit");
