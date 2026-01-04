module.exports = {
  apps: [{
    name: "cardian",
    script: "src/shard-manager.js",
    env: {
      NODE_ENV: "production",
      SHARD_COUNT: "auto"
    },
    watch: false,
    max_memory_restart: "500M",
    error_file: "./logs/error.log",
    out_file: "./logs/out.log",
    merge_logs: true,
    time: true
  }]
};
