export default (data:DataBlackList):string[] => {
    console.log("Creating black list on worker 3");
    const nThreads = data.nThreads;
    const nIPs = data.nIPs;
    console.log(`Number of Threads is ${nThreads}`);
    const ips: string[] = [];
    let start = 0;
    const chunk = Math.floor(nIPs / nThreads);
    const rest = nIPs % nThreads;
    for(let i = 0; i < nThreads; i++){
        console.log(`Thread: ${i}`);
        const end = start + chunk;
        console.log(`Start: ${start} End: ${end}`);
        start = end;
    }
    // in case of rest
    if(rest > 0) console.log(`Rest: ${rest}`);

    return ips;
};

interface DataBlackList{
    nThreads: number;
    nIPs: number;
}

