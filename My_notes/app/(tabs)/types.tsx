export interface ILicense {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
}

export interface IFinalLicense {
  name: string;
  version: string;
  licenseSpecs: ILicense;
}