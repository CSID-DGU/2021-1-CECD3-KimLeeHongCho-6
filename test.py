import requests

import json


class ClovaSpeechClient:
    # Clova Speech invoke URL
    invoke_url = 'https://clovaspeech-gw.ncloud.com/external/v1/609/6fb6640d81b775a406a11c6a530aee091aa7fa9aac86e782dbab5baf5cedab95'
    # Clova Speech secret key
    secret = '1d518de836c64cf6a096ee900da4f997'

    def req_url(self, url, completion, callback=None, userdata=None, forbiddens=None, boostings=None, sttEnable=True,
                wordAlignment=True, fullText=True, script='', diarization=None, keywordExtraction=None, groupByAudio=False):
        request_body = {
            'url': url,
            'language': 'ko-KR',
            'completion': completion,
            'callback': callback,
            'userdata': userdata,
            'sttEnable': sttEnable,
            'wordAlignment': wordAlignment,
            'fullText': fullText,
            'script': script,
            'forbiddens': forbiddens,
            'boostings': boostings,
            'diarization': diarization,
            'keywordExtraction': keywordExtraction,
            'groupByAudio': groupByAudio,
        }
        headers = {
            'Accept': 'application/json;UTF-8',
            'Content-Type': 'application/json;UTF-8',
            'X-CLOVASPEECH-API-KEY': self.secret
        }
        return requests.post(headers=headers,
                             url=self.invoke_url + '/recognizer/url',
                             data=json.dumps(request_body).encode('UTF-8'))

    def req_object_storage(self, data_key, completion, callback=None, userdata=None, forbiddens=None, boostings=None, sttEnable=True,
                           wordAlignment=True, fullText=True, script='', diarization=None, keywordExtraction=None, groupByAudio=False):
        request_body = {
            'dataKey': data_key,
            'language': 'ko-KR',
            'completion': completion,
            'callback': callback,
            'userdata': userdata,
            'sttEnable': sttEnable,
            'wordAlignment': wordAlignment,
            'fullText': fullText,
            'script': script,
            'forbiddens': forbiddens,
            'boostings': boostings,
            'diarization': diarization,
            'keywordExtraction': keywordExtraction,
            'groupByAudio': groupByAudio,
        }
        headers = {
            'Accept': 'application/json;UTF-8',
            'Content-Type': 'application/json;UTF-8',
            'X-CLOVASPEECH-API-KEY': self.secret
        }
        return requests.post(headers=headers,
                             url=self.invoke_url + '/recognizer/object-storage',
                             data=json.dumps(request_body).encode('UTF-8'))

    def req_upload(self, file, completion, callback=None, userdata=None, forbiddens=None, boostings=None, sttEnable=True,
                   wordAlignment=True, fullText=True, script='', diarization=None, keywordExtraction=None, groupByAudio=False):
        request_body = {
            'language': 'ko-KR',
            'completion': completion,
            'callback': callback,
            'userdata': userdata,
            'sttEnable': sttEnable,
            'wordAlignment': wordAlignment,
            'fullText': fullText,
            'script': script,
            'forbiddens': forbiddens,
            'boostings': boostings,
            'diarization': diarization,
            'keywordExtraction': keywordExtraction,
            'groupByAudio': groupByAudio,
        }
        headers = {
            'Accept': 'application/json;UTF-8',
            'X-CLOVASPEECH-API-KEY': self.secret
        }
        #print(json.dumps(request_body).encode('UTF-8'))
        files = {
            'media': open(file, 'rb'),
            'params': (None, json.dumps(request_body).encode('UTF-8'), 'application/json')
        }
        response = requests.post(headers=headers, url=self.invoke_url + '/recognizer/upload', files=files)
        return response


if __name__ == '__main__':
    # res = ClovaSpeechClient().req_url(url='http://example.com/media.mp3', completion='sync')
    # res = ClovaSpeechClient().req_object_storage(data_key='data/media.mp3', completion='sync')
    res = ClovaSpeechClient().req_upload(file='C:\\Users\\PC\\Desktop\\testSample.mp3', completion='sync')
    res_json = json.loads(res.text)
    subtitle = open("subtitle.smi", 'w', encoding='utf-8')
    for seg in res_json["segments"]:
        subtitle.write(str(seg['start']) + "->" + str(seg['end']) + "\n" + seg['speaker']['name'] + " : " +seg['text'] + "\n")