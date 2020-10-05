import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token = '';
  constructor(
    private http: HttpClient
  ) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public postDataWithnoToken = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.serverUrl), body, {
      observe: 'response',
    });
  }

  public getData = (route: string) => {
    const headers = new HttpHeaders();
    headers.append('Authorization', this.token);
    headers.append('observe', 'response');
    return this.http.get(this.createCompleteRoute(route, environment.serverUrl), {
      headers
    });
  }

  public postData = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.serverUrl), body, {
      headers: new HttpHeaders({
        Authorization: this.token
      }),
      observe: 'response'
    });
  }
}
