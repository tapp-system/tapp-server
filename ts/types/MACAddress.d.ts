type MACAddress<S extends string = ':' | '-'> =
    `${string}${S}${string}${S}${string}${S}${string}${S}${string}${S}${string}`;

export default MACAddress;
