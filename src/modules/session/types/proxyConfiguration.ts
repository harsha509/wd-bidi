export type ProxyConfiguration =
  | AutodetectProxyConfiguration
  | DirectProxyConfiguration
  | ManualProxyConfiguration
  | PacProxyConfiguration
  | SystemProxyConfiguration;

type AutodetectProxyConfiguration = {
  proxyType: "autodetect";
};

type DirectProxyConfiguration = {
  proxyType: "direct";
};


type SocksProxyConfiguration = {
  socksProxy: string;
  socksVersion: number; // value must be between 0 and 255
};

type PacProxyConfiguration = {
  proxyType: "pac";
  proxyAutoconfigUrl: string;
};

type SystemProxyConfiguration = {
  proxyType: "system";
};

interface ManualProxyConfiguration extends SocksProxyConfiguration {
  proxyType: "manual";
  ftpProxy?: string;
  httpProxy?: string;
  sslProxy?: string;
  noProxy?: string[];
}
