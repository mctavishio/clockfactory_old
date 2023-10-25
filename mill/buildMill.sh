#!/bin/bash
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt
mkdir data/mill$dt
mkdir data/mill$dt/css
cp pigments.js data/mill$dt/pigments.js
cp tools.js data/mill$dt/tools.js
cp poemTextLists.js data/mill$dt/poemTextLists.js
cp scores.js data/mill$dt/scores.js
cp Bmill.js data/mill$dt/Bmill.js
cp poemMill.js data/mill$dt/poemMill.js
cp bookMill.js data/mill$dt/bookMill.js
cp filmMill.js data/mill$dt/filmMill.js
cp soundMill.js data/mill$dt/soundMill.js
cp rawSoundFiles.js data/mill$dt/rawSoundFiles.js
cp pdfToFilm.sh data/mill$dt/pdfToFilm.sh
cp getsoundfiledata.sh data/mill$dt/getsoundfiledata.sh
cd css
 bash clean.sh
 bash compileCSS.sh
cd ../
cp css/print.css data/mill$dt/css/print.css
cp css/bookweb.css data/mill$dt/css/bookweb.css

echo "copied files"
cd data/mill$dt
echo ls data/mill$dt
ls

node soundMill.js
echo done with soundMill
echo run SOX: sound weaving . . . 
bash runSOX.sh 
echo done running SOX 
echo module.exports = [ > outSoundFiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\"${file%.*}\", file:\"$file\", url:\"https://storage.googleapis.com/soundfactory/1696901930244/$file\", duration:$d, nchannels:$c, rate:$r, type:\"$t\", bitrate:$p}, >> outsoundfiles.js; done; echo ] >> outSoundFiles.js;
echo done writing outSoundFiles.js 
node Bmill.js
echo done running Bmill
node poemMill
echo done running poemMill
node bookMill
echo done running bookMill
prince -s css/print.css print.html -o printbook_temp.pdf
echo done making print book
sed "s/illustratedbook/broadsides/" print.html > printbroadsides.html
prince -s css/print.css printbroadsides.html -o printbroadsides_temp.pdf
echo done making broadside book
node filmMill
echo done running filmMill
prince -s css/print.css film.html -o film.pdf
echo done making film book
# sed "s/notext/withtext/" film.html > filmtext.html
# prince -s css/print.css filmtext.html -o filmtext.pdf
echo done making word film book

pdfseparate printbook_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printbook.pdf
rm page*.pdf
rm printbook_temp.pdf

pdfseparate printbroadsides_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printbroadsides.pdf
rm page*.pdf
rm printbroadsides_temp.pdf

bash pdfToFilm.sh
ffmpeg -i film.mp4 -i line_all_thread_all_echo.mp3 -map 0:v:0 -map 1:a:0  -c:v copy -c:a aac -b:a 192k filmsound.mp4
#ffmpeg -i filmtext.mp4 -i line_all_thread_all_echo.mp3 -map 0:v:0 -map 1:a:0  -c:v copy -c:a aac -b:a 192k filmtextsound.mp4
open filmsound.mp4
echo "$(date)" > readMe.txt
echo "directory=data/mill$dt" >> readMe.txt
echo "done"
echo "|:|"
cd ../..
echo gsutil -m cp -r data/mill$dt gs://clockfactory/
echo "cd data/mill$dt"
echo "bash pdfToFilm.sh"
echo "ffmpeg -i film.mp4 -i line_all_thread_all_echo.mp3 -map 0:v:0 -map 1:a:0  -c:v copy -c:a aac -b:a 192k filmsound.mp4"
echo open data/mill$dt/printbook.pdf
echo open data/mill$dt/printbroadsides.pdf
echo "open data/mill$dt/film.mp4"
echo "open data/mill$dt/filmtext.mp4"
echo "open data/mill$dt/filmsound.mp4"
echo "open data/mill$dt/filmtextsound.mp4"
echo "bash createFilm.sh"
echo gsutil -m cp -r film_filedt.mp4 gs://clockfactory/

echo "|:|"
