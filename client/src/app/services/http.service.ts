
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  public static ROOT_URL = 'http://localhost:3000';
  // public static ROOT_URL = 'http://34.218.235.84:3000';
  public onError = new EventEmitter<any>();
  constructor(private http: HttpClient) {}

  public get(url: string, params = {}): Promise<any> {
    return this.http.get(url.indexOf('http') === 0 ? url : HttpService.ROOT_URL + url, {params})
      .toPromise();
  }

  public put(url: string, body = {}, headers?): Promise<any> {
    return this.http.put(url.indexOf('http') === 0 ? url : HttpService.ROOT_URL + url, body, headers)
      .toPromise();
  }

  public post(url: string, body = {}, headers?): Promise<any> {
    return this.http.post(url.indexOf('http') === 0 ? url : HttpService.ROOT_URL + url, body, headers)
      .toPromise();
  }

  public delete(url): Promise<any> {
    return this.http.delete(url.indexOf('http') === 0 ? url : HttpService.ROOT_URL + url)
      .toPromise();
  }

  private extractData(res: Response) {
    return res;
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
  }

}
