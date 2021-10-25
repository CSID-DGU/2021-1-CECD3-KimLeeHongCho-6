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


def convertToTime(time):
    hours = time // 3600000
    time = time - hours * 3600000
    mins = time // 60000
    time = time - mins * 60000
    secs = time / 1000
    str_secs = str('{0:06.3f}'.format(secs)).replace(".",",")

    str_time = str('{0:02}'.format(hours)) + ":" + str('{0:02}'.format(mins)) + ":" + str_secs

    return str_time

if __name__ == '__main__':
    res = ClovaSpeechClient().req_upload(file='sample.mp4', completion='sync')

    res_json = json.loads(res.text)

    subtitle = open("subtitle.vtt", 'w', encoding='utf-8')
    num = 0

    for seg in res_json["segments"]:
        start_time = convertToTime(seg['start'])
        end_time = convertToTime(seg['end'])
        num += 1
		subtitle.write(str(num) +"\n"+ start_time + " --> " + end_time + "\n" + seg['speaker']['name'] + " - " + seg['text'] + "\n\n")
