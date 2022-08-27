export class UploadBuilder {
  private _fieldName: string;
  private _maxSize: number;
  private _allowedMimeTypes: string[];
  private _destination: string;
  private _isPublic: boolean;

  get fieldName(): string {
    return this._fieldName;
  }

  get maxSize(): number {
    return this._maxSize;
  }

  get allowedMimeTypes(): string[] {
    return this._allowedMimeTypes;
  }

  get destination(): string {
    return this._destination;
  }

  get isPublic(): boolean {
    return this._isPublic;
  }

  addFieldName(fieldName: string): UploadBuilder {
    this._fieldName = fieldName;
    return this;
  }

  addMaxSize(maxSize: number): UploadBuilder {
    this._maxSize = maxSize;
    return this;
  }

  addAllowedMimeTypes(allowedMimeTypes: string[]): UploadBuilder {
    this._allowedMimeTypes = allowedMimeTypes;
    return this;
  }

  addDestination(destination: string): UploadBuilder {
    this._destination = destination;
    return this;
  }

  addIsPublic(isPublic: boolean): UploadBuilder {
    this._isPublic = isPublic;
    return this;
  }

  build(): UploadOptions {
    return new UploadOptions(this);
  }
}

export class UploadOptions {
  readonly fieldName: string;
  readonly maxSize: number;
  readonly allowedMimeTypes: string[];
  readonly destination: string;
  readonly isPublic: boolean;

  constructor(builder: UploadBuilder) {
    this.fieldName = builder.fieldName;
    this.maxSize = builder.maxSize;
    this.allowedMimeTypes = builder.allowedMimeTypes;
    this.destination = builder.destination;
    this.isPublic = builder.isPublic;
  }
}
