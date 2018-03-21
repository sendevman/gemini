cp -r WEB-INF build/
cd build/
tar -czvf ../ROOT.zip .
cd ../
scp ROOT.zip mercury:/tmp/
